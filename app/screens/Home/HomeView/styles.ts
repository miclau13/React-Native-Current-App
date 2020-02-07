import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../styles';

const styles = StyleSheet.create({
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