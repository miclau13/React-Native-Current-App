import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    alignItems: 'center',   
    backgroundColor: '#4630EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pictures: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  whiteText: {
    color: 'white',
  }
});

export default styles;