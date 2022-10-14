import COLORS from '../../values/colors';
import {useContext, useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight, rsRadius, rsSize, rsWidth} from '../../utils/responsive';
import {googleSignin} from '../../services/firebase-services';
import {Snackbar} from 'react-native-paper';
import {AuthContext} from '../../stores/auth/auth-context';
import GoogleButton from '../../components/molecules/GoogleButton';
import FacebookButton from '../../components/molecules/FacebookButton';

const initialState = {isLaoding: false, error: null};

const DrawerHeader = () => {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState(initialState);

  const onGoogleAuth = async () => {
    setState({isLaoding: true, error: null});
    googleSignin()
      .then(user => {
        authContext.setUser(user);
        setState({isLaoding: false, error: null});
      })
      .catch(e => {
        setState({isLaoding: false, error: e});
      });
  };

  return (
    <View style={styles.drawerHeader}>
      {/* <Snackbar
        style={{backgroundColor: COLORS.red}}
        visible={state.error !== null}
        duration={4000}
        onDismiss={() => {
          setState(prevState => {
            return {...prevState, error: null};
          });
        }}>
        {state.error}
      </Snackbar> */}
      {state.isLaoding && <ActivityIndicator color={COLORS.red} size="large" />}
      {!authContext.user && !state.isLaoding && (
        <>
          <FacebookButton onPress={() => {}} />
          <VerticalSpace height={rsHeight(16)} />
          <GoogleButton onPress={onGoogleAuth} />
        </>
      )}
      {authContext.user && !state.isLaoding && (
        <>
          <Image
            source={{uri: authContext.user.image}}
            style={styles.profilePicture}
          />
          <VerticalSpace height={rsHeight(12)} />
          <Text style={styles.userName}>{authContext.user.name}</Text>
        </>
      )}
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  drawerHeader: {
    height: rsHeight(200),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: rsWidth(100),
    height: rsWidth(100),
    borderRadius: rsRadius(50),
  },
  userName: {
    color: COLORS.white,
    fontSize: rsSize(18),
    fontWeight: '600',
  },
});
