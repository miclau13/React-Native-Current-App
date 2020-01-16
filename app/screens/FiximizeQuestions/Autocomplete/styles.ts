import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  modalButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
    marginBottom: 10
  },
  keyBoardContainer: {
    width: screenWidth,
    flex: 1,
    justifyContent: "flex-start",
  },
  viewBox1: {
    flex: 1,
  },
  viewBox2: {
    flex: 3,
  },
  viewBox3: {
    flex: 10,
  },
});

export default styles;