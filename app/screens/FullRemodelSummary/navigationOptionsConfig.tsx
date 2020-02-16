import React from 'react';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
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