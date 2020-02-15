import React from 'react';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
        {...props} 
        tintColor={primaryButtonColor}
      />
      );
    }
  }
};

export default navigationOptions;