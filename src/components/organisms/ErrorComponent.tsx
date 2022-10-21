import {StyleSheet, Text, View} from 'react-native';
import {rsHeight} from '../../utils/responsive';
import Lottie from 'lottie-react-native';
import AppButton from '../molecules/AppButton';
import COLORS from '../../values/colors';

type TProps = {
  errorText: string;
  onRetry: () => void;
};

const ErrorComponent = ({errorText, onRetry}: TProps) => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../../../assets/error.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      <Text style={styles.error}>{errorText}</Text>
      <AppButton onPress={onRetry} title="Retry" style={styles.button} />
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  lottie: {
    height: rsHeight(200),
  },
  error: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: rsHeight(24),
  },
  button: {minWidth: '100%'},
});
