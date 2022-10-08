import COLORS from "../../values/colors";
import { StyleSheet } from "react-native";
import { rsRadius, rsWidth } from "../../utils/responsive";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: rsRadius(126),
    width: rsWidth(252),
    height: rsWidth(252),
  },
  logo: { tintColor: COLORS.white, width: "90%", height: "90%" },
});

export default styles;
