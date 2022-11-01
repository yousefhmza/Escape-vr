import {Dimensions, StyleSheet} from 'react-native';
import {rsRadius, rsSize, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: rsWidth(16),
    backgroundColor: COLORS.background,
  },
  pointsText: {color: COLORS.white, fontWeight: '700', fontSize: 20},
  points: {color: COLORS.amber, fontWeight: '700', fontSize: 20},
  qrcodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
