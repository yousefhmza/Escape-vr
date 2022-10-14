import {Linking, Share, ShareContent, ToastAndroid} from 'react-native';
import {links} from '../utils/constants';

export const share = async (message: string) => {
  await Share.share({message});
};

export const launch = async (url: string) => {
  const canLaunch: boolean = await Linking.canOpenURL(url);
  if (canLaunch) {
    await Linking.openURL(url);
  } else {
    ToastAndroid.show("Can't launch url", 2000);
  }
};
