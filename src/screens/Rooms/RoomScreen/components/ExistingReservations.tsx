import {FlatList, Text} from 'react-native';
import {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {RoomContext} from '../../../../stores/room/room-context';
import {styles} from '../styles';
import {TReservation} from '../../../../utils/constants';
import ReservationTime from './ReservationTime';
import COLORS from '../../../../values/colors';
import ErrorComponent from '../../../../components/organisms/ErrorComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {HorizontalSpace} from '../../../../components/atoms/Spaces';
import {rsSize, rsWidth} from '../../../../utils/responsive';

type TProps = {
  onretry: () => Promise<void>;
};

const ExistingReservations = (props: TProps) => {
  const {roomState, roomDispatch} = useContext(RoomContext);

  return (
    <View style={styles.reservationsContainer}>
      {roomState.loadingReservations && <ActivityIndicator color={COLORS.red} size="large" />}
      {roomState.errorReservations && (
        <ErrorComponent errorText={roomState.errorReservations} onRetry={props.onretry} />
      )}
      {roomState.reservations && (
        <>
          <Text style={styles.reservationsTitle}>
            {roomState.date.toLocaleDateString('en-JM', {weekday: 'long'})} reservations :
          </Text>
          <FlatList<TReservation>
            keyExtractor={item => item.id!}
            data={roomState.reservations}
            renderItem={({item}) => <ReservationTime from={item.from} to={item.to} />}
          />
          <View style={styles.reservationsWarningContainer}>
            <Icon
              name={roomState.reservations.length != 0 ? 'information-circle' : 'checkmark-circle'}
              size={rsSize(28)}
              color={roomState.reservations.length != 0 ? COLORS.red : COLORS.green}
            />
            <HorizontalSpace width={rsWidth(12)} />
            <Text
              style={{
                flex: 1,
                color: roomState.reservations.length != 0 ? COLORS.red : COLORS.green,
              }}>
              {roomState.reservations.length != 0
                ? 'These are times which are already reserved, choose a time far away from them'
                : 'No reservations on this date, you can choose any time to reserve'}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ExistingReservations;
