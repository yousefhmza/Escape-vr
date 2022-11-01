import {Animated, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight, rsSize} from '../../utils/responsive';
import {TAppStack} from '../../navigation/navigators/AppStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {THomeDrawer} from '../../navigation/navigators/HomeDrawer';
import HomeAppbar from './components/HomeAppbar';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTile from './components/HomeTile';
import styles from './styles';
import HomePager from './components/HomePager';
import COLORS from '../../values/colors';

type stackProps = NativeStackNavigationProp<TAppStack>;
type drawerProps = NativeStackNavigationProp<THomeDrawer>;

const HomeScreen = () => {
  const navigation = useNavigation<stackProps>();
  const drawerNavigation = useNavigation<drawerProps>();
  let animatedHeaderValue = new Animated.Value(0);
  return (
    <View style={styles.screen}>
      <HomeAppbar animatedHeaderValue={animatedHeaderValue} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: animatedHeaderValue}}}], {useNativeDriver: false})}>
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile
          title="Rooms"
          image={require('../../../assets/console.png')}
          onPress={() => navigation.navigate('Rooms')}
        />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile title="PS services" image={require('../../../assets/playstation.png')} onPress={() => {}} />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile title="Drinks" image={require('../../../assets/drink.png')} onPress={() => {}} />
        <VerticalSpace height={rsHeight(16)} />
        <HomeTile title="Food" image={require('../../../assets/food.png')} onPress={() => {}} />
        <VerticalSpace height={rsHeight(16)} />
        <HomePager />
        <VerticalSpace height={rsHeight(16)} />
        <TouchableOpacity activeOpacity={0.7} onPress={() => drawerNavigation.navigate('Points')}>
          <View style={styles.pointsContainer}>
            <Icon name="star" size={rsSize(64)} color={COLORS.white} />
            <VerticalSpace height={rsHeight(4)} />
            <Text style={styles.textStyle}>Your Points</Text>
          </View>
        </TouchableOpacity>
        <VerticalSpace height={rsHeight(16)} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
