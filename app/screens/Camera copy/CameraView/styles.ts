import { StyleSheet } from 'react-native';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  bottomBar: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: isIPhoneX ? 25 : 20,
  },
  camera: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  galleryIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  deviceGalleryIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  takePhotoIcon: {
    alignItems: 'center',
    flex: 1,
  },
  viewBox1: {
    flex: 0.5,
  },
  viewBox2: {
    flex: 1
  },
  viewBox3: {
    flex: 1
  },
});

export default styles;