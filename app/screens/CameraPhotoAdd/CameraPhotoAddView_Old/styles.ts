import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  tileContainerStyle: {
    margin: 0, 
    padding: 8,
    shadowOpacity: 0,
  },
  tileContentContainerStyle: {
    height: 0,
  },
});

export default styles;