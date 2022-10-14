import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {rsHeight, rsRadius, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

type props = {
  onPress: () => void;
};

const GoogleButton = ({onPress}: props) => {
  return (
    <TouchableOpacity style={styles.googleStyle} onPress={onPress}>
      <Image
        source={require('../../../assets/google.png')}
        style={styles.imageIconStyle}
      />
      <Text style={styles.textStyle}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  googleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: rsWidth(0.5),
    borderColor: '#fff',
    height: rsHeight(46),
    width: '90%',
    borderRadius: rsRadius(5),
    margin: rsWidth(5),
  },
  imageIconStyle: {
    padding: rsWidth(10),
    marginLeft: rsWidth(15),
    height: rsHeight(25),
    width: rsWidth(25),
    resizeMode: 'stretch',
  },
  textStyle: {
    color: COLORS.textGrey,
    marginLeft: rsWidth(15),
    marginRight: rsWidth(20),
  },
});
