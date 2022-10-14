import {firestoreCollections, links, TUser} from '../utils/constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const googleSignin = async (): Promise<TUser> => {
  // Firebase auth
  GoogleSignin.configure({
    webClientId:
      '861028011379-c5k1pk7lclf6isp6or1nh90o0r87tn2g.apps.googleusercontent.com',
  });
  await GoogleSignin.signOut();
  const {idToken} = await GoogleSignin.signIn();
  const credential = auth.GoogleAuthProvider.credential(idToken);
  const {user: firebaseUser} = await auth().signInWithCredential(credential);

  // Create user in Firestore
  const snapshot = await getUser(firebaseUser.uid);
  if (snapshot.exists) {
    const user: TUser = {
      id: snapshot.data()!.id,
      name: snapshot.data()!.name,
      image: snapshot.data()!.image,
      phoneNumber: snapshot.data()!.phoneNumber,
    };
    return user;
  }
  const user: TUser = {
    id: firebaseUser.providerData[0].uid,
    name: firebaseUser.providerData[0].displayName!,
    image: links.defaultProfileImgUrl,
    phoneNumber: '',
  };
  await addUser(user);
  return user;
};

export const addUser = (user: TUser) => {
  return firestore()
    .collection(firestoreCollections.users)
    .doc(user.id)
    .set(user);
};

export const getUser = (id: string) => {
  return firestore().collection(firestoreCollections.users).doc(id).get();
};

export const signout = () => auth().signOut();
