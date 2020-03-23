import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const keyCameraScreen = navigation.getParam("keyCameraScreen");
  const rehabId = navigation.getParam("rehabId");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);
  const lengthOfSelectedPhotos = selectedPhotos.length;

  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");
  const handleHeaderRightOnPress = () => {
    navigation.navigate("CreateRehabScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, selectedPhotos });
  };

  const handleHeaderRightFromGalleyOnPress = () => {
    navigation.navigate("CameraPhotoUploadScreen", { keyCameraScreen, rehabId, selectedPhotos });
  };

  const _headerTitle = lengthOfSelectedPhotos ? 
    `${lengthOfSelectedPhotos} Selected` : 
    null;

  return { 
    headerTitle: _headerTitle,
    headerLeft: (props) => {
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
            onPress={handleHeaderRightOnPress}
            color={primaryButtonColor}
            title={!!lengthOfSelectedPhotos ? "Submit" : "Skip"}
          >
          </Button> 
        )
      }
      return (
        <Button 
          {...props}
          disabled={!!!lengthOfSelectedPhotos}
          onPress={handleHeaderRightFromGalleyOnPress}
          color={primaryButtonColor}
          title={"Upload"}
        >
        </Button> 
      ) 
    }
  }
};

export default navigationOptions;