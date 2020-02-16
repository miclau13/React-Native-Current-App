import React from 'react';
import { Button } from 'react-native';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  const loading = navigation.getParam("loading", true);
  const rehabId = navigation.getParam("rehabId");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const submitted = navigation.getParam("submitted", false);
  const flow = 2;
  const step = "summary";
  const handleHeaderRightOnPress = () => {
    navigation.navigate("PropertyInfoScreen", { 
      flow,
      rehabId,
      rehabItemPackageId,
      revisedRehabInfo,
      step,
    })
  };
  return {
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props}
          tintColor={primaryButtonColor}
        />
      );
    },
    headerRight: (props) => {
      if (loading || submitted) {
        return null;
      };
      return (
        <Button
          {...props}
          color={primaryButtonColor}
          onPress={handleHeaderRightOnPress}
          title="Revise"
        />
      );
    }
  };
};

export default navigationOptions;