import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/Splash";
import HomeDrawer from "./HomeDrawer";

export type TAppStack = {
  Splash: undefined;
  HomeNavigator: undefined;
};

const Stack = createNativeStackNavigator<TAppStack>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="HomeNavigator" component={HomeDrawer} />
    </Stack.Navigator>
  );
};
export default AppStack;
