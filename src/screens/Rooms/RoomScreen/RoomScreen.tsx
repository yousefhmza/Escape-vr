import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityIndicator, ToastAndroid, View} from 'react-native';
import {TAppStack} from '../../../navigation/navigators/AppStack';
import {styles} from './styles';
import {VerticalSpace} from '../../../components/atoms/Spaces';
import {rsHeight} from '../../../utils/responsive';
import {RoomContext} from '../../../stores/room/room-context';
import {useContext, useCallback, useEffect} from 'react';
import {TRoomActions} from '../../../stores/room/room-reducer';
import {
  addReservation,
  getreservations,
} from '../../../services/firebase-services';
import {
  getTimeByMinutes,
  isPeriodAvailable,
  isTimeAvailable,
} from '../../../utils/date-handler';
import DateRow from './components/DateRow';
import TimeRow from './components/TimeRow';
import AppButton from '../../../components/molecules/AppButton';
import ExistingReservations from './components/ExistingReservations';
import COLORS from '../../../values/colors';

type TProps = NativeStackScreenProps<TAppStack, 'Room'>;

const RoomScreen = ({route}: TProps) => {
  const {roomState, roomDispatch} = useContext(RoomContext);

  const getReservations = useCallback(async (date: Date) => {
    roomDispatch({
      type: TRoomActions.GetReservationsLoadingAction,
      payload: {date: date},
    });
    const result = await getreservations(route.params.room.id, date);
    if (result instanceof Error) {
      roomDispatch({
        type: TRoomActions.GetReservationsFailureAction,
        payload: {error: result.message, date: date},
      });
    }
    if (typeof result == 'object') {
      roomDispatch({
        type: TRoomActions.GetReservationsSuccessAction,
        payload: {reservations: result, date: date},
      });
    }
  }, []);

  const addReservationHandler = async () => {
    if (
      roomState.reservation.from.length == 0 ||
      roomState.reservation.to.length == 0
    ) {
      ToastAndroid.show('Please choose start time and finish time !!', 2000);
      return;
    }
    if (
      getTimeByMinutes(roomState.reservation.to) -
        getTimeByMinutes(roomState.reservation.from) <
      60
    ) {
      ToastAndroid.show("You can't reserve less than an hour !!", 2000);
      return;
    }

    await getReservations(roomState.date);
    const isSelectedFromAvailable = isTimeAvailable(
      roomState.reservation.from,
      roomState.reservations!,
    );
    const isSelectedToAvailable = isTimeAvailable(
      roomState.reservation.to,
      roomState.reservations!,
    );
    const isSelectedPeriodAvailable = isPeriodAvailable(
      roomState.reservation.from,
      roomState.reservation.to,
      roomState.reservations!,
    );
    if (
      !(
        isSelectedFromAvailable &&
        isSelectedToAvailable &&
        isSelectedPeriodAvailable
      )
    ) {
      ToastAndroid.show(
        'Please recheck your time and already reserved times',
        2000,
      );
      return;
    }

    roomDispatch({
      type: TRoomActions.AddReservationLoadingAction,
      payload: {},
    });
    const result = await addReservation(
      route.params.room.id,
      roomState.date,
      roomState.reservation,
    );
    if (result instanceof Error) {
      ToastAndroid.show(result.message, 2000);
      roomDispatch({
        type: TRoomActions.AddReservationFailureAction,
        payload: {error: result.message},
      });
    }
    if (typeof result == 'string') {
      ToastAndroid.show(result, 2000);
      roomDispatch({
        type: TRoomActions.AddReservationSuccessAction,
        payload: {},
      });
    }
  };

  useEffect(() => {
    getReservations(new Date());
  }, [getReservations]);

  return (
    <View style={styles.roomScreen}>
      <DateRow onConfirm={getReservations} />
      <VerticalSpace height={rsHeight(16)} />
      <TimeRow buttonTitle="Select start time" startTime={true} />
      {roomState.reservation.from.length != 0 && (
        <>
          <VerticalSpace height={rsHeight(16)} />
          <TimeRow buttonTitle="Select finish time" startTime={false} />
        </>
      )}
      <VerticalSpace height={rsHeight(16)} />
      <ExistingReservations onretry={() => getReservations(roomState.date)} />
      <VerticalSpace height={rsHeight(16)} />
      {roomState.addingReservation ? (
        <ActivityIndicator color={COLORS.red} size="large" />
      ) : (
        <AppButton
          title="Confirm"
          onPress={addReservationHandler}
          style={styles.confirmButton}
        />
      )}
    </View>
  );
};

export default RoomScreen;
