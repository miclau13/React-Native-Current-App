import { StyleSheet } from 'react-native';
import { primaryButtonColor, screenWidth } from '../../../../styles';

const styles = StyleSheet.create({
  buttonSelectedContainer: {
    backgroundColor: primaryButtonColor,
  },
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
  modalButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewBox1: {
    marginBottom: 16,
  },
});

export default styles;