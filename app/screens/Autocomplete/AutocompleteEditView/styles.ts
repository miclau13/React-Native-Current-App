import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  addressTextInput:{
    height: 96,
  },
  viewBox1: {
    marginBottom: 16,
  },
});

export default styles;