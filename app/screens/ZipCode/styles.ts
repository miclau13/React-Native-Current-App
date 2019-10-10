import { StyleSheet } from 'react-native';
import { primaryBlue, screenWidth } from '../../styles';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "80%",
  },
  // disabled: {
  //   backgroundColor: primaryBlue,
  //   opacity: 0.3
  // },
  nextButton: {
    backgroundColor: primaryBlue
  },
  nextButtonContainer: {
    // marginTop: "auto",
    // marginBottom: 100
  },
  nextButtonTitle: {
    color: "white"
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