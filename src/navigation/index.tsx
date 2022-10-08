import { NavigationContainer } from "@react-navigation/native";
import NetworkInfoWrapper from "../components/organisms/NetworkInfoWrapper";
import AppStack from "./navigators/AppStack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NetworkInfoWrapper>
        <AppStack />
      </NetworkInfoWrapper>
    </NavigationContainer>
  );
};

export default Navigation;
