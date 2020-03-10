import React from 'react';
import { NavigationActions, NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const flow = navigation.getParam("flow", 1);
  const rehabId = navigation.getParam("rehabId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");
  // console.log("fullremodel navigation",navigation)
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
              // navigation.dispatch(NavigationActions.back({key: "KEY_CreateRehabScreen"}))
              navigation.goBack(navigation.getParam("keyCreateRehabScreen"))
              // navigation.popToTop()
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