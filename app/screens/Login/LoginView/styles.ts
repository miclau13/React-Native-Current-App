import { StyleSheet } from 'react-native';
import { deviceScreenWidth } from '../../../styles/constants';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  image: {
    height: 100, 
    width: "auto", 
  },
  imageContainer: {
    alignSelf: "center",
    height: 100, 
    width: deviceScreenWidth * 0.75, 
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  viewBox1: {
    flex: 1,
  },
  viewBox2: {
    flex: 0.5,
  },
  viewBox3: {
    flex: 5,
  },
});

export default styles;