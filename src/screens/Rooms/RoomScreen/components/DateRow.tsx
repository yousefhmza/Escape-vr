import {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {rsSize, rsWidth} from '../../../../utils/responsive';
import {dateAfter7Days, now} from '../../../../utils/date-handler';
import {RoomContext} from '../../../../stores/room/room-context';
import COLORS from '../../../../values/colors';
import DatePicker from 'react-native-date-picker';
import AppButton from '../../../../components/molecules/AppButton';

type TProps = {
  onConfirm: (date: Date) => Promise<void>;
};

const DateRow = (props: TProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {roomState, roomDispatch} = useContext(RoomContext);

  return (
    <View style={styles.row}>
      <DatePicker
        modal
        mode="date"
        date={roomState.date}
        open={isOpen}
        minimumDate={now}
        maximumDate={dateAfter7Days}
        onConfirm={async date => {
          props.onConfirm(date);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
      <Text style={styles.date}>
        {roomState.date.toLocaleDateString('en-JM', {weekday: 'long'})}
      </Text>
      <AppButton
        disabled={roomState.reservations === null}
        title="Select date"
        onPress={() => setIsOpen(true)}
        style={styles.button}
      />
    </View>
  );
};

export default DateRow;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: COLORS.primary,
  },
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
