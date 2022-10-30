import {useContext, useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {rsSize, rsWidth} from '../../../../utils/responsive';
import {RoomContext} from '../../../../stores/room/room-context';
import {
  addMinutes,
  endOfDay,
  formatTime,
  getTimeByMinutes,
  getTimeFromDate,
  isPeriodAvailable,
  isTimeAvailable,
} from '../../../../utils/date-handler';
import COLORS from '../../../../values/colors';
import DatePicker from 'react-native-date-picker';
import AppButton from '../../../../components/molecules/AppButton';
import {AuthContext} from '../../../../stores/auth/auth-context';
import {TRoomActions} from '../../../../stores/room/room-reducer';

type TProps = {
  buttonTitle: string;
  startTime: boolean;
};

const TimeRow = (props: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {roomState, roomDispatch} = useContext(RoomContext);
  const authcontext = useContext(AuthContext);

  const startTimehandler = (date: Date) => {
    const reservation = {
      clientId: authcontext.user!.id,
      from: getTimeFromDate(date),
      to: '',
    };
    roomDispatch({
      type: TRoomActions.SetReservationAction,
      payload: {reservation: reservation},
    });
  };

  const finishTimehandler = (date: Date) => {
    const reservation = {
      ...roomState.reservation,
      to: getTimeFromDate(date),
    };

    if (
      getTimeByMinutes(reservation.to) <= getTimeByMinutes(reservation.from)
    ) {
      ToastAndroid.show(
        'Your finish time should be after your start time !!',
        2000,
      );
      return;
    }

    const isSelectedPeriodAvailable = isPeriodAvailable(
      reservation.from,
      reservation.to,
      roomState.reservations!,
    );
    if (!isSelectedPeriodAvailable) {
      ToastAndroid.show(
        'There is an already reserved period inside your period, Please take a look on already reserved periods!!',
        5000,
      );
      return;
    }

    roomDispatch({
      type: TRoomActions.SetReservationAction,
      payload: {reservation: reservation},
    });
  };

  return (
    <View style={styles.row}>
      <DatePicker
        modal
        mode="time"
        open={isOpen}
        date={
          props.startTime
            ? new Date()
            : addMinutes(
                new Date(),
                getTimeByMinutes(roomState.reservation.from),
              )
        }
        onConfirm={date => {
          setIsOpen(false);
          const isSelectedTimeAvailable = isTimeAvailable(
            date.toLocaleTimeString('en-US', {hour12: false}),
            roomState.reservations!,
          );
          if (!isSelectedTimeAvailable) {
            ToastAndroid.show(
              'This time is unavailable,  please Choose another time !!',
              2000,
            );
            return;
          }

          if (props.startTime) {
            startTimehandler(date);
          } else {
            finishTimehandler(date);
          }
        }}
        onCancel={() => setIsOpen(false)}
      />
      <Text style={styles.date}>
        {props.startTime
          ? formatTime(roomState.reservation.from)
          : formatTime(roomState.reservation.to)}
      </Text>
      <AppButton
        disabled={roomState.reservations === null}
        title={props.buttonTitle}
        onPress={() => setIsOpen(true)}
        style={styles.button}
      />
    </View>
  );
};

export default TimeRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  date: {
    color: COLORS.white,
    fontSize: rsSize(16),
    fontWeight: '700',
    flex: 1,
  },
  button: {
    paddingHorizontal: rsWidth(16),
    marginStart: rsWidth(8),
  },
});
