import {RefObject} from 'react';
import {Image, View} from 'react-native';
import {rsSize} from '../../../utils/responsive';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../values/colors';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {TouchableOpacity} from 'react-native-gesture-handler';

type props = {
  sheetRef: RefObject<BottomSheetMethods>;
  image: string;
};

const ProfileImage = ({sheetRef, image}: props) => {
  const openBottomSheet = () => sheetRef.current?.expand();

  return (
    <TouchableOpacity onPress={openBottomSheet} activeOpacity={0.7}>
      <View style={styles.profileImageContainer}>
        <Image source={{uri: image}} style={styles.profileImage} />
        <View style={styles.cameraIconContainer}>
          <Icon name="camera" color={COLORS.primary} size={rsSize(18)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileImage;
