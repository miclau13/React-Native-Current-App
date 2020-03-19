import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const step = navigation.getParam("step");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);
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
    // navigation.navigate("CameraScreen", { step: 'camera' });
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
      return (
        <Button 
          {...props}
          onPress={isStepGallery ? handleHeaderRightFromGalleyOnPress : handleHeaderRightFromCameraOnPress}
          tintColor={primaryButtonColor}
          title="Upload"
        >
        </Button> 
      ) 
    }
  }
};

export default navigationOptions;