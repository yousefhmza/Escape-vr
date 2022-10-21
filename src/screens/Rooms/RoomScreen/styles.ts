import {StyleSheet} from 'react-native';
import {rsHeight, rsRadius, rsWidth} from '../../../utils/responsive';
import COLORS from '../../../values/colors';

export const styles = StyleSheet.create({
  roomScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rsWidth(16),
  },
});
