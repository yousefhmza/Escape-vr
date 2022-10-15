import {StyleSheet} from 'react-native';
import {rsRadius, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

export const styles = StyleSheet.create({
  profileScreen: {
    backgroundColor: COLORS.background,
    flex: 1,
    padding: rsWidth(16),
  },
  profileImageContainer: {
    width: rsWidth(124),
    height: rsWidth(124),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: rsRadius(62),
  },
  cameraIconContainer: {
    backgroundColor: COLORS.white,
    width: rsWidth(30),
    height: rsWidth(30),
    borderRadius: rsRadius(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    end: rsWidth(12),
  },
});
