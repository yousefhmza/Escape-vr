import {Linking, ToastAndroid} from 'react-native';

export const launch = async (url: string) => {
  const canLaunch: boolean = await Linking.canOpenURL(url);
  if (canLaunch) {
    await Linking.openURL(url);
  } else {
    ToastAndroid.show("Can't launch url", 2000);
  }
};
