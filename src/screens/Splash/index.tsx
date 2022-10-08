import styles from "./styles";
import { View, Image } from "react-native";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TAppStack } from "../../navigation/navigators/AppStack";

type props = NativeStackScreenProps<TAppStack, "Splash">;

const SplashScreen = ({ navigation }: props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeNavigator");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.circle}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
