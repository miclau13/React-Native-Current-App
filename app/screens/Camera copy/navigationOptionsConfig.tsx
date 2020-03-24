import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const keyCameraScreen = navigation.getParam("keyCameraScreen");
  const rehabId = navigation.getParam("rehabId");
  const step = navigation.getParam("step");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);

  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");
  const handleHeaderRightOnPress = () => {
    navigation.navigate("CreateRehabScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, selectedPhotos });
  };

  const lengthOfSelectedPhotos = selectedPhotos.length;
  const isStepGallery = step === "gallery";

  const _headerTitle = isStepGallery ?
  lengthOfSelectedPhotos ? 
    `${lengthOfSelectedPhotos} Selected` : 
    "Select Photo(s)"
  : null;

  const handleBackFromGalleyOnPress = () => {
    navigation.navigate("CameraScreen", { step: 'camera' });
  };

  const handleHeaderRightFromCameraOnPress = () => {
    navigation.navigate("CameraScreen", { step: 'gallery' });
  };
  const handleHeaderRightFromGalleyOnPress = () => {
    navigation.navigate("CameraPhotoUploadScreen", { keyCameraScreen, rehabId, selectedPhotos });
  };

  return { 
    headerTitle: _headerTitle,
    headerLeft: (props) => {
      if (isStepGallery) {
        return (
          <HeaderBackButton 
            {...props}
            tintColor={primaryButtonColor}
            onPress={handleBackFromGalleyOnPress}
          />
        );
      }
      return (
        <HeaderBackButton 
          {...props}
          tintColor={primaryButtonColor}
        />
      );
    },
    headerRight: (props) => {
      if (createRehabNoArvInput) {
        return (
          <Button 
            {...props}
            disabled={isStepGallery && !!!lengthOfSelectedPhotos}
            onPress={handleHeaderRightOnPress}
            color={primaryButtonColor}
            title={isStepGallery ? "Submit" : "Skip"}
          >
          </Button> 
        )
      }
      return (
        <Button 
          {...props}
          disabled={isStepGallery && !!!lengthOfSelectedPhotos}
          onPress={isStepGallery ? handleHeaderRightFromGalleyOnPress : handleHeaderRightFromCameraOnPress}
          color={primaryButtonColor}
          title={"Upload"}
        >
        </Button> 
      ) 
    }
  }
};

export default navigationOptions;