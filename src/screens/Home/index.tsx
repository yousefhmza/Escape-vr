import {DrawerScreenProps} from '@react-navigation/drawer';
import {Animated, ScrollView, View, Text} from 'react-native';
import {THomeDrawer} from '../../navigation/navigators/HomeDrawer';
import {VerticalSpace} from '../../components/atoms/Spaces';
import HomeAppbar from './components/HomeAppbar';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTile from './components/HomeTile';
import styles from './styles';
import HomePager from './components/HomePager';
import COLORS from '../../values/colors';
import {rsHeight, rsSize} from '../../utils/responsive';

type props = DrawerScreenProps<THomeDrawer, 'Home'>;

const HomeScreen = ({navigation}: props) => {
  let animatedHeaderValue = new Animated.Value(0);
  return (
    <View style={styles.screen}>
      <HomeAppbar animatedHeaderValue={animatedHeaderValue} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedHeaderValue}}}],
          {useNativeDriver: false},
        )}>
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile
          title="Rooms"
          image={require('../../../assets/console.png')}
        />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile
          title="PS services"
          image={require('../../../assets/playstation.png')}
        />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile title="Drinks" image={require('../../../assets/drink.png')} />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile title="Food" image={require('../../../assets/food.png')} />
        <VerticalSpace height={rsHeight(16)} />
        <HomePager />
        <VerticalSpace height={rsHeight(16)} />
        <View style={styles.pointsContainer}>
          <Icon name="star" size={rsSize(64)} color={COLORS.white} />
          <VerticalSpace height={rsHeight(4)} />
          <Text style={styles.textStyle}>Your Points</Text>
        </View>
        <VerticalSpace height={rsHeight(16)} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
