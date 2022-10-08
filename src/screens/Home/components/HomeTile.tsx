import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../values/colors";
import { HorizontalSpace } from "../../../components/atoms/Spaces";
import { rsRadius, rsSize, rsWidth } from "../../../utils/responsive";

type TProps = {
  image: ImageSourcePropType;
  title: string;
};

const HomeTile = (props: TProps) => {
  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.tile}>
        <View style={styles.leading}>
          <Image style={styles.image} source={props.image} />
        </View>
        <HorizontalSpace width={8} />
        <Text style={styles.title}>{props.title}</Text>
        <Icon
          name="arrow-forward-ios"
          size={rsSize(18)}
          style={styles.arrow}
        />
      </View>
    </Pressable>
  );
};

export default HomeTile;

const styles = StyleSheet.create({
  tile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: rsWidth(16),
  },
  pressed: { backgroundColor: COLORS.primary },
  leading: {
    width: rsWidth(58),
    height: rsWidth(58),
    borderRadius: rsRadius(29),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  title: {
    flex: 1,
    color: COLORS.white,
    fontSize: rsSize(15),
  },
  arrow: {
    color: COLORS.white,
  },
});
