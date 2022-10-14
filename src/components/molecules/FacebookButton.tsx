import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {rsHeight, rsRadius, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

type props = {
  onPress: () => void;
};

const FacebookButton = ({onPress}: props) => {
  return (
    <TouchableOpacity style={styles.facebookStyle} onPress={onPress}>
      <Image
        source={require('../../../assets/facebook.png')}
        style={styles.imageIconStyle}
      />
      <Text style={styles.textStyle}>Sign in with Facebook</Text>
    </TouchableOpacity>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  facebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderWidth: rsWidth(0.5),
    borderColor: COLORS.white,
    height: rsHeight(46),
    width: '90%',
    borderRadius: rsRadius(5),
    margin: rsWidth(5),
    position: 'relative',
    marginBottom: 0,
  },
  imageIconStyle: {
    padding: rsWidth(10),
    marginLeft: rsWidth(15),
    height: rsWidth(25),
    width: rsWidth(25),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLORS.white,
    marginLeft: rsWidth(20),
    marginRight: rsWidth(20),
  },
});
