import {
  firestoreCollections,
  links,
  TReservation,
  TUser,
} from '../utils/constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getFirebaseDateFormat} from '../utils/date-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
    id: firebaseUser.uid,
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

export const updateUser = async (user: TUser): Promise<TUser> => {
  let url: string = '';
  if (user.image.startsWith('file')) {
    await storage().ref(`users/${user.id}`).putFile(user.image);
    url = await storage().ref(`users/${user.id}`).getDownloadURL();
  }
  await firestore()
    .collection(firestoreCollections.users)
    .doc(user.id)
    .update({
      name: user.name.trim(),
      image: url.length != 0 ? url : user.image,
      phoneNumber: user.phoneNumber.trim(),
    });
  return {
    id: user.id,
    name: user.name.trim(),
    image: url.length != 0 ? url : user.image,
    phoneNumber: user.phoneNumber.trim(),
  };
};

export const signout = () => auth().signOut();

export const getreservations = async (
  roomId: string,
  date: Date,
): Promise<Error | TReservation[]> => {
  try {
    const snapshot = await firestore()
      .collection(firestoreCollections.Rooms)
      .doc(roomId)
      .collection(firestoreCollections.Dates)
      .doc(getFirebaseDateFormat(date))
      .collection(firestoreCollections.Reservations)
      .get();
    const reservations: TReservation[] = snapshot.docs.map(doc => ({
      id: doc.id,
      clientId: doc.data().clientId,
      from: doc.data().from,
      to: doc.data().to,
    }));
    const res = reservations.sort(
      (a, b) => +a.from.split(':')[0] - +b.from.split(':')[0],
    );
    return res;
  } catch (e: any) {
    return Error(e.message);
  }
};

export const addReservation = async (
  roomId: string,
  date: Date,
  reservation: TReservation,
): Promise<Error | string> => {
  try {
    // Check if the current user already has a reservation
    const currentReservators = await getCurrentReservators();
    if (currentReservators.includes(reservation.clientId)) {
      throw Error("You already have a reservation and can't reserve twice");
    }
    // Add the reservation to the room on its date
    await firestore()
      .collection(firestoreCollections.Rooms)
      .doc(roomId)
      .collection(firestoreCollections.Dates)
      .doc(getFirebaseDateFormat(date))
      .collection(firestoreCollections.Reservations)
      .add(reservation);
    // Add the user to the list of currentReservators so that he can't reserve twice
    await firestore()
      .collection(firestoreCollections.currentReservators)
      .doc(reservation.clientId)
      .set({});
    return 'Your reservation is placed successfully';
  } catch (e: any) {
    return Error(e.message);
  }
};

const getCurrentReservators = async (): Promise<string[]> => {
  const snapshot = await firestore()
    .collection(firestoreCollections.currentReservators)
    .get();
  const currentReservators = snapshot.docs.map(doc => doc.id);
  return currentReservators;
};
