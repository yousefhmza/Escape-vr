import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {RefObject} from 'react';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {rsHeight, rsSize, rsWidth} from '../../utils/responsive';
import COLORS from '../../values/colors';
import {HorizontalSpace, VerticalSpace} from '../atoms/Spaces';

type props = {
  sheetRef: RefObject<BottomSheetMethods>;
  onCameraPressed: () => Promise<void>;
  onGalleryPressed: () => Promise<void>;
};

type TTileProps = {
  icon: string;
  text: string;
  onPressed: () => void;
};

const ImagePickerBottomSheet = (props: props) => {
  const closeSheet = () => props.sheetRef.current?.close();

  return (
    <BottomSheet
      style={styles.sheet}
      ref={props.sheetRef}
      index={-1}
      snapPoints={['30%']}
      enablePanDownToClose>
      <Tile
        icon="camera"
        text="Camera"
        onPressed={async () => {
          await props.onCameraPressed();
          closeSheet();
        }}
      />
      <VerticalSpace height={rsHeight(24)} />
      <Tile
        icon="image"
        text="Gallery"
        onPressed={async () => {
          await props.onGalleryPressed();
          closeSheet();
        }}
      />
      <VerticalSpace height={rsHeight(24)} />
      <Tile icon="close-circle" text="Cancel" onPressed={closeSheet} />
    </BottomSheet>
  );
};

const Tile = ({icon, text, onPressed}: TTileProps) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPressed}>
      <Icon name={icon} color={COLORS.black} size={rsSize(28)} />
      <HorizontalSpace width={rsWidth(8)} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ImagePickerBottomSheet;

const styles = StyleSheet.create({
  sheet: {padding: rsWidth(16)},
  tile: {flexDirection: 'row', alignItems: 'center'},
  text: {color: COLORS.textGrey, fontSize: rsSize(16), fontWeight: '600'},
});
