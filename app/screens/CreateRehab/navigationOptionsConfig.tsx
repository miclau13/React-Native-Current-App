import React from 'react';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  return { 
    headerLeft: (props) => {
      return (
        null
      );
    }
  }
};

export default navigationOptions;