import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation';
import COLORS from './src/values/colors';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        animated
        translucent
      />
      <Navigation />
    </>
  );
};

export default App;
