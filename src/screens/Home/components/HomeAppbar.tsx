import React from 'react';
import COLORS from '../../../values/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Animated, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  disableExpoTranslucentStatusBar,
  useCollapsibleHeader,
} from 'react-navigation-collapsible';
import {rsHeight, rsSize, rsWidth} from '../../../utils/responsive';

disableExpoTranslucentStatusBar();

type props = {
  animatedHeaderValue: Animated.Value;
};

const HomeAppbar = ({animatedHeaderValue}: props) => {
  // const {onScroll, containerPaddingTop, scrollIndicatorInsetTop} =
  //   useCollapsibleHeader({
  //     navigationOptions: {
  //       headerStyle: {
  //         height: 250,
  //       },
  //       headerBackground: (
  //         <Image
  //           source={{
  //             uri: 'https://artwork.wallartprints.com/media/catalog/category/mountain-pictures.jpg',
  //           }}
  //           style={{flex: 1}}
  //         />
  //       ),
  //     },
  //     config: {collapsedColor: 'red'},
  //   });

  const navigation = useNavigation();
  const headerMaxHeight = rsHeight(240);
  const headerMinHeight = rsHeight(72);

  const animatedHeaderBGColor = animatedHeaderValue.interpolate({
    inputRange: [0, headerMaxHeight - headerMinHeight],
    outputRange: ['transparent', COLORS.red],
    extrapolate: 'clamp',
  });

  const animatedHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, headerMaxHeight],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: animatedHeaderBGColor,
          height: animatedHeaderHeight,
        },
      ]}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: 'https://www.fay3.com/previews/2019-12/Ga6OBkb0AD.jpeg',
        }}>
        <LinearGradient
          colors={[COLORS.background, 'transparent']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.0}}
          style={{height: '100%'}}
        />
        <Text style={styles.textStyle}>Enjoy Escape VR</Text>
        <Icon
          name="menu"
          color={COLORS.white}
          size={rsSize(28)}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export default HomeAppbar;

const styles = StyleSheet.create({
  header: {
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: rsSize(20),
    fontWeight: '600',
    position: 'absolute',
    end: 0,
    start: 0,
    bottom: rsHeight(24),
  },
  drawerIcon: {
    position: 'absolute',
    start: rsWidth(16),
    top: rsHeight(40),
  },
});
