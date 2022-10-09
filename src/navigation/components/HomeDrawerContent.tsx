import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../../values/colors';
import DrawerIcon from '../../components/atoms/DrawerIcon';
import DrawerHeader from './DrawerHeader';
import {launch} from '../../services/outsource_services';
import {links} from '../../utils/constants';

const HomeDrawerContent = (props: DrawerContentComponentProps) => {
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
        onPress={() => launch(links.googlePlayUrl)}
        icon={props => <DrawerIcon name="share-social" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      <DrawerItem
        label="Rate our app"
        onPress={() => launch(links.googlePlayUrl)}
        icon={props => <DrawerIcon name="star" {...props} />}
        inactiveTintColor={COLORS.white}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {}}
        icon={props => <DrawerIcon name="log-out" {...props} />}
        inactiveTintColor={COLORS.white}
      />
    </DrawerContentScrollView>
  );
};

export default HomeDrawerContent;
