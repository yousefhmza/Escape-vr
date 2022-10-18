import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoomsScreen from '../../screens/Rooms/RoomsScreen/RoomsScreen';
import SplashScreen from '../../screens/Splash';
import HomeDrawer from './HomeDrawer';

export type TAppStack = {
  Splash: undefined;
  HomeNavigator: undefined;
  Rooms: undefined;
};

const Stack = createNativeStackNavigator<TAppStack>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeNavigator"
        component={HomeDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Rooms" component={RoomsScreen} />
    </Stack.Navigator>
  );
};
export default AppStack;
