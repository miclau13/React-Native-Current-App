import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../styles';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  keyBoardContainer: {
    width: screenWidth,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  textInput:{
    height: 48,
  },
  viewBox1: {
    marginBottom: 16,
  },
});

export default styles;