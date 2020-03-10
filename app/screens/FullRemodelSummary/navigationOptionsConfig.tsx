import React from 'react';
import { NavigationRoute, NavigationScreenConfig } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const flow = navigation.getParam("flow", 1);
  const rehabId = navigation.getParam("rehabId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");

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
      if (flow == "revise") {
        return (
          <HeaderBackButton 
            {...props}
            onPress={() => 
              navigation.goBack(navigation.getParam("keyCreateRehabScreen"))
            } 
            tintColor={primaryButtonColor}
          />
        );
      }
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