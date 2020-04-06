import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const capturedPhotoUri = navigation.getParam("capturedPhotoUri");
  const keyCameraScreen = navigation.getParam("keyCameraScreen");
  const rehabId = navigation.getParam("rehabId");

  // From Vacant Screen for normal input flow
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");

  const handleHeaderRightOnPress = () => {
    navigation.navigate("CameraPhotoGalleryScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput, keyCameraScreen });
  };

  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props}
          tintColor={primaryButtonColor}
        />
      );
    },
    headerRight: (props) => {
      if (capturedPhotoUri) {
        return (
          <Button 
            {...props}
            onPress={handleHeaderRightOnPress}
            color={primaryButtonColor}
            title={"Photo Gallery"}
          >
          </Button> 
        ) 
      }
      return null;
    }
  }
};

export default navigationOptions;