import {StyleSheet, View, Text} from 'react-native';
import {formatTime} from '../../../../utils/date-handler';
import {
  rsHeight,
  rsRadius,
  rsSize,
  rsWidth,
} from '../../../../utils/responsive';
import COLORS from '../../../../values/colors';

type TProps = {
  from: string;
  to: string;
};

const ReservationTime = ({from, to}: TProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <Text style={styles.time}>{formatTime(from)}</Text>
      </View>
      <Text style={styles.to}>TO</Text>
      <View style={styles.container}>
        <Text style={styles.time}>{formatTime(to)}</Text>
      </View>
    </View>
  );
};

export default ReservationTime;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rsHeight(16),
  },
  container: {
    width: '40%',
    borderWidth: rsWidth(1),
    borderRadius: rsRadius(6),
    borderColor: COLORS.red,
    paddingHorizontal: rsWidth(16),
    paddingVertical: rsWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: COLORS.white,
  },
  to: {
    color: COLORS.white,
    fontSize: rsSize(14),
    fontWeight: '600',
  },
});
