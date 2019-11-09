import { StyleSheet } from 'react-native';
import { primaryButtonColor, screenWidth } from '../../styles';

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  buttonSelectedContainer: {
    backgroundColor: primaryButtonColor,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: screenWidth,
  },
  inputContainerStyle: {
    borderBottomColor: primaryButtonColor,
    borderBottomWidth: 1,
  },
  title: {
    textAlign: "center",
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