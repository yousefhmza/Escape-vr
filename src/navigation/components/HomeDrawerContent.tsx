import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../../values/colors';
import DrawerIcon from '../../components/atoms/DrawerIcon';
import DrawerHeader from './DrawerHeader';
import {launch, share} from '../../services/outsource-services';
import {links} from '../../utils/constants';
import {useContext} from 'react';
import {AuthContext} from '../../stores/auth/auth-context';
import {signout} from '../../services/firebase-services';

const HomeDrawerContent = (props: DrawerContentComponentProps) => {
  const authContext = useContext(AuthContext);
  const authSignOut = () => {
    signout().then(() => {
      authContext.setUser(null);
    });
  };

  return (
    <DrawerContentScrollView>
      <DrawerHeader />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Our location"
        onPress={() => launch(links.locationUrl)}
        icon={props => <DrawerIcon name="location" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      <DrawerItem
        label="Call us"
        onPress={() => launch(links.contactPhoneUrl)}
        icon={props => <DrawerIcon name="call" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      <DrawerItem
        label="Share our app"
        onPress={() => share(links.googlePlayUrl)}
        icon={props => <DrawerIcon name="share-social" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      <DrawerItem
        label="Rate our app"
        onPress={() => launch(links.googlePlayUrl)}
        icon={props => <DrawerIcon name="star" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      {authContext.user && (
        <DrawerItem
          label="Logout"
          onPress={authSignOut}
          icon={props => <DrawerIcon name="log-out" {...props} />}
          inactiveTintColor={COLORS.white}
        />
      )}
    </DrawerContentScrollView>
  );
};

export default HomeDrawerContent;
