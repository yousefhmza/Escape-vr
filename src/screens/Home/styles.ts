import {Dimensions, StyleSheet} from 'react-native';
import {rsRadius, rsSize, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  text: {
    margin: 15,
    color: COLORS.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: rsSize(18),
  },
  pointsContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: rsRadius(16),
    width: window.width / 2.1,
    height: window.width / 2.1,
    marginHorizontal: rsWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
