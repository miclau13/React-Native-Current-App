import { StyleSheet } from 'react-native';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pictures: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;