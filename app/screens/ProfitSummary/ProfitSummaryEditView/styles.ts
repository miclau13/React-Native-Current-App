import { StyleSheet } from 'react-native';
import { primaryButtonColor, screenWidth } from '../../../styles';

const styles = StyleSheet.create({
  buttonSelectedContainer: {
    backgroundColor: primaryButtonColor,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    // flex: 1,
    padding: 22,
  },
  flex1: {
    flex: 1,
  },
  modalButton: {
    alignSelf: "center",
    borderRadius: 20,
    width: "75%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewBox1: {
    marginBottom: 16,
  },
});

export default styles;