import { StyleSheet } from 'react-native';
import { buttonWidth } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  flex1: {
    flex: 1,
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: buttonWidth,
  },
  viewBox1: {
    flex: 1,
  },
  viewBox2: {
    flex: 2,
  },
  viewBox3: {
    flex: 5,
  },
});

export default styles;