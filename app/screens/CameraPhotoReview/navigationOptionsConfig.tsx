import React from 'react';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props}
          tintColor={primaryButtonColor}
        />
      );
    },
  }
};

export default navigationOptions;