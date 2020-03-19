import { StyleSheet } from 'react-native';
import { deviceScreenWidth } from '../../../../../styles/constants';
const pictureWidth = deviceScreenWidth / 3;
const pictureHeight = pictureWidth * 3 / 4;

const styles = StyleSheet.create({
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'cover',
    // opacity: 0.3
  },
  pictureSelected: {
    opacity: 0.5
  },
  pictureWrapper: {
    alignItems: 'center',
    height: pictureHeight,
    justifyContent: 'center',
    width: pictureWidth,
  },
});

export default styles;