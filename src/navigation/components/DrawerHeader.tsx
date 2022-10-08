import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight, rsRadius, rsSize, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

const DrawerHeader = () => {
  return (
    <View style={styles.drawerHeader}>
      <Image
        source={{
          uri: 'https://images.radio.com/aiu-media/GettyImages1398214825-a38bd9ae-b827-4201-9915-c80f037ea53e.jpg?width=800',
        }}
        style={styles.profilePicture}
      />
      <VerticalSpace height={rsHeight(12)} />
      <Text style={styles.userName}>Yousef hamza</Text>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  drawerHeader: {
    height: rsHeight(200),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: rsWidth(100),
    height: rsWidth(100),
    borderRadius: rsRadius(50),
  },
  userName: {
    color: COLORS.white,
    fontSize: rsSize(18),
    fontWeight: '600',
  },
});
