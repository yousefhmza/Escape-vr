import {createDrawerNavigator} from '@react-navigation/drawer';
import {useContext} from 'react';
import {AuthContext} from '../../stores/auth/auth-context';
import DrawerIcon from '../../components/atoms/DrawerIcon';
import HomeScreen from '../../screens/Home';
import PointsScreen from '../../screens/Points';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import COLORS from '../../values/colors';
import HomeDrawerContent from '../components/HomeDrawerContent';

export type THomeDrawer = {
  Home: undefined;
  Points: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<THomeDrawer>();

const HomeDrawer = () => {
  const authContext = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <HomeDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {backgroundColor: COLORS.background},
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.red,
        drawerInactiveTintColor: COLORS.white,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: props => <DrawerIcon name="home" {...props} />,
        }}
      />
      {authContext.user && (
        <Drawer.Screen
          name="Points"
          component={PointsScreen}
          options={{
            drawerLabel: 'Your points',
            drawerIcon: props => <DrawerIcon name="star-half" {...props} />,
          }}
        />
      )}
      {authContext.user && (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerStyle: {backgroundColor: COLORS.red},
            headerTintColor: COLORS.white,
            drawerLabel: 'Profile',
            unmountOnBlur: true,
            drawerIcon: props => (
              <DrawerIcon name="person-circle-outline" {...props} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
