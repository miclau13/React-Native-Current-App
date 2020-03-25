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

  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");
  const lengthOfSelectedPhotos = selectedPhotos.length;

  const handleHeaderRightOnPress = () => {
    navigation.navigate("CreateRehabScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, selectedPhotos });
  };

  const _headerTitle = lengthOfSelectedPhotos ? 
    `${lengthOfSelectedPhotos} Selected` : 
    "Select Photo(s)"

  const handleHeaderRightToUploadOnPress = () => {
    navigation.navigate("CameraPhotoUploadScreen", { keyCameraScreen, rehabId, selectedPhotos });
  };

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
            disabled={!!!lengthOfSelectedPhotos}
            onPress={handleHeaderRightOnPress}
            color={primaryButtonColor}
            title={"Submit"}
          >
          </Button> 
        )
      }
      return (
        <Button 
          {...props}
          disabled={!!!lengthOfSelectedPhotos}
          onPress={handleHeaderRightToUploadOnPress}
          color={primaryButtonColor}
          title={"Upload"}
        >
        </Button> 
      ) 
    }
  }
};

export default navigationOptions;