import React from 'react';
import { Button } from 'react-native';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
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