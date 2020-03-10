import React from 'react';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");
  const flow = 1;
  const handleHeaderLeftOnPress = () => {
    navigation.navigate("PropertyInfoScreen", { 
      flow,
      rehabId,
      revisedRehabInfo,
      rehabItemPackageId
    })
  };
  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props} 
          onPress={handleHeaderLeftOnPress} 
          title="Revise"
          tintColor={primaryButtonColor}
        />
      );
    }
  }
};

export default navigationOptions;