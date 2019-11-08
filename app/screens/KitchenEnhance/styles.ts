import { StyleSheet } from 'react-native';
import { primaryButtonColor, screenWidth } from '../../styles';

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "flex-start",
    height: 48,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: screenWidth,
  },
  viewBox1: {
    flex: 1,
  },
  viewBox2: {
    flex: 10,
  },
  viewBox3: {
    flex: 5,
  },
});

export default styles;