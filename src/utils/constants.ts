const contactPhone: string = '+201069974143';
const placeLocation = {lat: 30.314131310802654, lng: 31.314804315344375};

export const firestoreCollections = {
  users: 'Users',
};

export const links = {
  googlePlayUrl: `https://play.google.com/store/apps/details?id=com.ysfhmza.escape_vr`,
  contactPhoneUrl: `tel://${contactPhone}`,
  locationUrl: `https://www.google.com/maps/search/?api=1&query=${placeLocation.lat},${placeLocation.lng}`,
  defaultProfileImgUrl:
    'https://firebasestorage.googleapis.com/v0/b/escape-vr-91105.appspot.com/o/profile.png?alt=media&token=e505f81e-9fb9-4df2-b8d6-72065ba0df0a',
};

export type TUser = {
  id: string;
  name: string;
  phoneNumber: string;
  image: string;
};
