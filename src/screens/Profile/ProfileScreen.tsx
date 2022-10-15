import {View, Text, ScrollView} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight} from '../../utils/responsive';
import ProfileForm from './components/ProfileForm';
import ProfileImage from './components/ProfileImage';
import {styles} from './styles';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.profileScreen}>
      <ProfileImage />
      <VerticalSpace height={rsHeight(16)} />
      <ProfileForm />
    </ScrollView>
  );
};

export default ProfileScreen;
