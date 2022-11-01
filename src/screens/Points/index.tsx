import {rsHeight, rsSize, rsWidth} from '../../utils/responsive';
import {Text, View, ActivityIndicator} from 'react-native';
import {useCallback, useContext, useEffect, useState} from 'react';
import {HorizontalSpace, VerticalSpace} from '../../components/atoms/Spaces';
import {getCurrentReservators} from '../../services/firebase-services';
import {THttpState} from '../../utils/constants';
import {AuthContext} from '../../stores/auth/auth-context';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../values/colors';
import ErrorComponent from '../../components/organisms/ErrorComponent';
import QRCode from 'react-native-qrcode-svg';

const PointsScreen = () => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<THttpState<string[]>>({isLoading: false, error: null, data: []});

  const getReservators = useCallback(async () => {
    setState({
      isLoading: true,
      error: null,
      data: [],
    });
    const docs = await getCurrentReservators()
      .then(snapshot => {
        setState({isLoading: false, error: null, data: snapshot});
      })
      .catch(error => {
        setState({isLoading: false, error: error.message, data: []});
      });
  }, []);

  useEffect(() => {
    getReservators();
  }, [getReservators]);

  return (
    <View style={styles.screen}>
      <Icon name="star" size={rsSize(120)} color={COLORS.amber} />
      <VerticalSpace height={rsHeight(16)} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.pointsText}>Your points : </Text>
        <HorizontalSpace width={rsWidth(8)} />
        <Text style={styles.points}>{authContext.user?.points}</Text>
      </View>
      <View style={styles.qrcodeContainer}>
        {state.isLoading && <ActivityIndicator color={COLORS.red} size="large" />}
        {state.error && <ErrorComponent errorText={state.error} onRetry={() => getReservators()} />}
        {state.data.includes(authContext.user!.id) && (
          <QRCode value={authContext.user!.id} quietZone={rsWidth(8)} size={rsSize(240)} />
        )}
      </View>
    </View>
  );
};

export default PointsScreen;
