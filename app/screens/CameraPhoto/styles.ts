import { StyleSheet } from 'react-native';

import { deviceScreenWidth } from '../../styles/constants';

const pictureHeight = 150;
const pictureWidth = deviceScreenWidth / 3;

const styles = StyleSheet.create({
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
    // flex: 1,
    // resizeMode: 'contain',
    // alignSelf: 'stretch',
    // backgroundColor: "green",
    // width: undefined,
    // height: undefined,
  },
  pictureWrapper: {
    alignItems: 'center',
    height: pictureHeight,
    justifyContent: 'center',
    // margin: 5,
    width: pictureWidth,
    backgroundColor: "red",
  },
});

export default styles;