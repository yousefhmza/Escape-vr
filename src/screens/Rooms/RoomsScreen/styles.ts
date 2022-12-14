import {StyleSheet} from 'react-native';
import {rsHeight, rsRadius, rsWidth} from '../../../utils/responsive';
import COLORS from '../../../values/colors';

export const styles = StyleSheet.create({
  roomsScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rsWidth(16),
  },
  roomItem: {
    borderRadius: rsRadius(16),
    height: rsHeight(200),
    width: '100%',
    marginBottom: rsHeight(16),
  },
  gradient: {height: '100%', borderRadius: rsRadius(16)},
  name: {
    color: COLORS.white,
    position: 'absolute',
    bottom: rsHeight(16),
    start: rsWidth(16),
  },
});
