import {View, ScrollView} from 'react-native';
import {VerticalSpace} from '../../components/atoms/Spaces';
import {rsHeight} from '../../utils/responsive';
import {styles} from './styles';
import {useContext, useRef, useState} from 'react';
import {AuthContext} from '../../stores/auth/auth-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProfileForm from './components/ProfileForm';
import ProfileImage from './components/ProfileImage';
import BottomSheet from '@gorhom/bottom-sheet';
import ImagePickerBottomSheet from '../../components/organisms/ImagePickerBottomSheet';

const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [image, setImage] = useState<string>(authContext.user!.image);

  const pickImage = async (camera: boolean) => {
    const result = camera
      ? await launchCamera({mediaType: 'photo', quality: 0.5})
      : await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      setImage(result.assets[0].uri!);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.profileScreen}>
        <ProfileImage sheetRef={bottomSheetRef} image={image} />
        <VerticalSpace height={rsHeight(16)} />
        <ProfileForm image={image} />
      </ScrollView>
      <ImagePickerBottomSheet
        sheetRef={bottomSheetRef}
        onCameraPressed={() => pickImage(true)}
        onGalleryPressed={() => pickImage(false)}
      />
    </View>
  );
};

export default ProfileScreen;
