import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

type props = {
  name: any;
  color: string;
  size: number;
  focused: boolean;
};

const DrawerIcon = ({ name, color, size }: props) => {
  return (
    <Icon
      name={name}
      color={color}
      size={size}
      style={{ marginRight: -24 }}
    />
  );
};

export default DrawerIcon;
