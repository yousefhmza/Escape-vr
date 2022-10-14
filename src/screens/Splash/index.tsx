import styles from './styles';
import auth from '@react-native-firebase/auth';
import {View, Image} from 'react-native';
import {useEffect, useContext, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TAppStack} from '../../navigation/navigators/AppStack';
import {links, TUser} from '../../utils/constants';
import {addUser, getUser} from '../../services/firebase-services';
import {AuthContext} from '../../stores/auth/auth-context';

type props = NativeStackScreenProps<TAppStack, 'Splash'>;

const SplashScreen = ({navigation}: props) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        getUser(firebaseUser.uid).then(snapshot => {
          if (snapshot.exists) {
            console.log("exists");
            const user: TUser = {
              id: snapshot.data()!.id,
              name: snapshot.data()!.name,
              image: snapshot.data()!.image,
              phoneNumber: snapshot.data()!.phoneNumber,
            };
            authContext.setUser(user);
            navigation.replace('HomeNavigator');
          } else {
            console.log("created");
            const user: TUser = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName!,
              image: links.defaultProfileImgUrl,
              phoneNumber: '',
            };
            addUser(user).then(() => {
              authContext.setUser(user);
              navigation.replace('HomeNavigator');
            });
          }
        });
      } else {
        navigation.replace('HomeNavigator');
      }
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.circle}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
