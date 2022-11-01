const contactPhone: string = '+201069974143';
const placeLocation = {lat: 30.313512, lng: 31.314728};

export const firestoreCollections = {
  users: 'Users',
  Rooms: 'Rooms',
  Dates: 'Dates',
  Reservations: 'Reservations',
  currentReservators: 'currentReservators',
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
  points: number;
};

export type TRoom = {
  id: string;
  name: string;
  image: string;
};

export type THttpState<T> = {
  isLoading: boolean;
  error: string | null;
  data: T;
};

export type TReservation = {
  id?: string;
  clientId: string;
  from: string;
  to: string;
};
