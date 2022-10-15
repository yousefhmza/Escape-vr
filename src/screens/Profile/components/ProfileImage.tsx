import {useContext} from 'react';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../stores/auth/auth-context';
import {rsSize} from '../../../utils/responsive';
import COLORS from '../../../values/colors';
import {styles} from '../styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfileImage = () => {
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.profileImageContainer}>
      <Image
        source={{uri: authContext.user?.image}}
        style={styles.profileImage}
      />
      <View style={styles.cameraIconContainer}>
        <Icon name="camera" color={COLORS.primary} size={rsSize(18)} />
      </View>
    </View>
  );
};

export default ProfileImage;
