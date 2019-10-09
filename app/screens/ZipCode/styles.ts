import { StyleSheet } from 'react-native';
import { primaryBlue, screenWidth } from '../../styles';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "80%"
  },
  // disabled: {
  //   backgroundColor: primaryBlue,
  //   opacity: 0.3
  // },
  nextButton: {
    backgroundColor: primaryBlue
  },
  nextButtonContainer: {
    marginTop: 16,
    // bottom: 0,
  },
  nextButtonTitle: {
    color: "white"
  },

});

export default styles;