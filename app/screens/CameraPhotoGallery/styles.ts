import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  container: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  whiteText: {
    color: 'white',
  }
});

export default styles;