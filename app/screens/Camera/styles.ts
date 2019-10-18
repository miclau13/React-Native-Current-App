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
  gallery: {
    alignSelf: 'center',
    flex: 1,
  },
  deviceGallery: {
    alignSelf: 'center',
    flex: 1,
  },
  takePhoto: {
    alignSelf: 'center',
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
  // topBar: {
  //   flex: 0.2,
  //   backgroundColor: 'transparent',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   paddingTop: Constants.statusBarHeight / 2,
  // },
  // noPermissions: {
  //   flex: 1,
  //   alignItems:'center',
  //   justifyContent: 'center',
  //   padding: 10,
  // },
  // gallery: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  // toggleButton: {
  //   flex: 0.25,
  //   height: 40,
  //   marginHorizontal: 2,
  //   marginBottom: 10,
  //   marginTop: 20,
  //   padding: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // autoFocusLabel: {
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // },
  // bottomButton: {
  //   flex: 0.3, 
  //   height: 58, 
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // newPhotosDot: {
  //   position: 'absolute',
  //   top: 0,
  //   right: -5,
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#4630EB'
  // },
  // options: {
  //   position: 'absolute',
  //   bottom: 80,
  //   left: 30,
  //   width: 200,
  //   height: 160,
  //   backgroundColor: '#000000BA',
  //   borderRadius: 4,
  //   padding: 10,
  // },
  // detectors: {
  //   flex: 0.5,
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // pictureQualityLabel: {
  //   fontSize: 10,
  //   marginVertical: 3, 
  //   color: 'white'
  // },
  // pictureSizeContainer: {
  //   flex: 0.5,
  //   alignItems: 'center',
  //   paddingTop: 10,
  // },
  // pictureSizeChooser: {
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   flexDirection: 'row'
  // },
  // pictureSizeLabel: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // facesContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   top: 0,
  // },
  // face: {
  //   padding: 10,
  //   borderWidth: 2,
  //   borderRadius: 2,
  //   position: 'absolute',
  //   borderColor: '#FFD700',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // landmark: {
  //   width: landmarkSize,
  //   height: landmarkSize,
  //   position: 'absolute',
  //   backgroundColor: 'red',
  // },
  // faceText: {
  //   color: '#FFD700',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 10,
  //   backgroundColor: 'transparent',
  // },
  // row: {
  //   flexDirection: 'row',
  // },
});

export default styles;