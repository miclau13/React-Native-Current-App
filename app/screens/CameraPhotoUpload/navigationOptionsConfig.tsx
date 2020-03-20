import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const loading = navigation.getParam("loading", true);

  const handleHeaderRightDoneOnPress = () => {
    navigation.goBack(navigation.getParam("keyCameraScreen"));
  };

  return {
    headerLeft: (props) => {
      if (loading) {
        return null;
      };
      return (
        <HeaderBackButton 
          {...props}
          tintColor={primaryButtonColor}
          title="Back"
        />
      );
    },
    headerRight: (props) => {
      if (loading) {
        return null;
      };
      return (
        <Button 
          {...props}
          onPress={handleHeaderRightDoneOnPress}
          color={primaryButtonColor}
          title={"Done"}
        >
        </Button> 
      ) 
    }
  }
};

export default navigationOptions;