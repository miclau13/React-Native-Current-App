import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const submitted = navigation.getParam("submitted");
  const handleHeaderLeftOnPress = () => {
      navigation.navigate("FullRemodelSummaryScreen") 
  };
  const handleHeaderRightOnPress = () => {
    navigation.navigate("HomeScreen");
  };
  return { 
    headerLeft: (props) => {
      if (submitted) {
        return null
      }
      return (
        <HeaderBackButton 
          {...props} 
          onPress={handleHeaderLeftOnPress}
          tintColor={primaryButtonColor}
        />
      )
    },
    headerRight: (props) => {
      return (
        <Button 
          {...props}
          color={primaryButtonColor}
          onPress={handleHeaderRightOnPress}
          title="Done"
        />
      )
    }
  }
};

export default navigationOptions;