import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const loading = navigation.getParam("loading", true);
  const rehabId = navigation.getParam("rehabId");
  const step = navigation.getParam("step", "summary");
  const handleHeaderLeftOnPress = () => {
    navigation.navigate("HomeScreen");
  };
  const handleHeaderRightOnPress = () => {
    navigation.setParams({ step: "edit" });
  };
  return { 
    headerLeft: (props) => {
      if (!rehabId) {
        return (
          <HeaderBackButton 
            {...props}
            tintColor={primaryButtonColor}
          />
        )
      };
      return (
        <HeaderBackButton 
          {...props} 
          onPress={handleHeaderLeftOnPress} 
          tintColor={primaryButtonColor}
          title="Home"
        />
      )
    },
    headerRight: (props) => {
      if (loading || step == "edit") {
        return null;
      };
      return (
        <Button 
          {...props}
          color={primaryButtonColor}
          onPress={handleHeaderRightOnPress}
          title="Edit Property Info"
        />
      );
    } 
  }
};

export default navigationOptions;