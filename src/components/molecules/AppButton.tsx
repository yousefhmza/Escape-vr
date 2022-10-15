import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rsHeight, rsRadius, rsSize} from '../../utils/responsive';
import COLORS from '../../values/colors';

type props = {onPress: () => void; title: string};

const AppButton = ({onPress, title}: props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.red,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: rsHeight(40),
    borderRadius: rsRadius(6),
  },
  title: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: rsSize(16),
  },
});
