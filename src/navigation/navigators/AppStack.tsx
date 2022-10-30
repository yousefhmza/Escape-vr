import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TRoom} from '../../utils/constants';
import RoomScreen from '../../screens/Rooms/RoomScreen/RoomScreen';
import RoomsScreen from '../../screens/Rooms/RoomsScreen/RoomsScreen';
import SplashScreen from '../../screens/Splash';
import COLORS from '../../values/colors';
import HomeDrawer from './HomeDrawer';
import RoomContextProvider from '../../stores/room/room-context';

export type TAppStack = {
  Splash: undefined;
  HomeNavigator: undefined;
  Rooms: undefined;
  Room: {room: TRoom};
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
      <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{
          headerStyle: {backgroundColor: COLORS.red},
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="Room"
        options={({route}) => ({
          headerStyle: {backgroundColor: COLORS.red},
          headerTintColor: COLORS.white,
          title: route.params.room.name,
        })}>
        {({route, navigation}) => (
          <RoomContextProvider>
            <RoomScreen navigation={navigation} route={route}></RoomScreen>
          </RoomContextProvider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default AppStack;
