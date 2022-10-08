import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerIcon from "../../components/atoms/DrawerIcon";
import HomeScreen from "../../screens/Home";
import PointsScreen from "../../screens/Points";
import COLORS from "../../values/colors";
import HomeDrawerContent from "../components/HomeDrawerContent";

export type THomeDrawer = {
  Home: undefined;
  Points: undefined;
};

const Drawer = createDrawerNavigator<THomeDrawer>();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <HomeDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: COLORS.background },
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.red,
        drawerInactiveTintColor: COLORS.white,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: (props) => <DrawerIcon name="home" {...props} />,
        }}
      />
      <Drawer.Screen
        name="Points"
        component={PointsScreen}
        options={{
          drawerLabel: "Your points",
          drawerIcon: (props) => <DrawerIcon name="star-half" {...props} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
