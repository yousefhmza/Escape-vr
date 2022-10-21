import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {TAppStack} from '../../../navigation/navigators/AppStack';
import {styles} from './styles';

type TProps = NativeStackScreenProps<TAppStack, 'Room'>;

const RoomScreen = ({route}: TProps) => {
  return <View style={styles.roomScreen}></View>;
};

export default RoomScreen;
