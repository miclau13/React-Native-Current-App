import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const step = navigation.getParam("step");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);
  const isStepGallery = step === "gallery";
  const handleBackFromGalleyOnPress = () => {
    navigation.navigate("CameraScreen", { step: 'camera' });
  }
  return { 
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
    // headerRight: (props) => {
    //   return (
    //     <Button 
    //       {...props}
    //       onPress={() => {
    //         navigation.navigate("LoginCheckingScreen", { formValues, selectedPhotos })
    //       }}
    //     >
    //       {isStepGallery ? "Done" : "Skip"}
    //     </Button> 
    //   ) 
    // }
  }
};

export default navigationOptions;