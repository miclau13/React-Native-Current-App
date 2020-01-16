import { StyleSheet } from 'react-native';
import { primaryButtonColor, screenWidth } from '../../styles';

const styles = StyleSheet.create({
  autocompleteTextInput: {
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
  },
  buttonSelectedContainer: {
    backgroundColor: primaryButtonColor,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  keyBoardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: screenWidth,
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  }
});

export default styles;