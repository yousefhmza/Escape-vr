import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight, rsRadius, rsSize, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const DrawerHeader = () => {
  const googleSignin = async () => {
    GoogleSignin.configure({
      webClientId:
        '861028011379-c5k1pk7lclf6isp6or1nh90o0r87tn2g.apps.googleusercontent.com',
    });
    await GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const {user, additionalUserInfo} = await auth().signInWithCredential(
      googleCredential,
    );
    console.log(user.toJSON());
    console.log(user.providerData[0].uid);
    console.log(
      additionalUserInfo?.isNewUser,
      additionalUserInfo?.profile,
      additionalUserInfo?.providerId,
      additionalUserInfo?.username,
    );
  };

  return (
    <View style={styles.drawerHeader}>
      <Button title="Sign in" onPress={googleSignin} />
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
