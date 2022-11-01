import {StyleSheet} from 'react-native';
import {rsHeight, rsRadius, rsSize, rsWidth} from '../../../utils/responsive';
import COLORS from '../../../values/colors';

export const styles = StyleSheet.create({
  roomScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: rsWidth(16),
    width: '100%',
  },
  reservationsContainer: {
    flex: 1,
    width: '100%',
    padding: rsWidth(16),
    justifyContent: 'center',
    borderRadius: rsRadius(16),
    backgroundColor: COLORS.primary,
  },
  reservationsTitle: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: rsSize(16),
    marginBottom: rsHeight(16),
  },
  reservationsWarningContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmButton: {width: '100%'},
});
