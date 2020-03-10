import React from 'react';
import { Button } from 'react-native';
import { NavigationRoute, NavigationScreenConfig, } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const detail = navigation.getParam("detail", {});
  const loading = navigation.getParam("loading", true);
  const rehabId = navigation.getParam("rehabId");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const submitted = navigation.getParam("submitted", false);
  const flow = 2;
  const step = "summary";
  const hasRevisedRehabItems = !!detail.rehabItemsPackage.revisedRehabItems;

  const handleHeaderRightReviseOnPress = () => {
    navigation.navigate("PropertyInfoScreen", { 
      flow,
      rehabId,
      rehabItemPackageId,
      revisedRehabInfo,
      step,
    })
  };
  const handleHeaderRightCheckOnPress = () => {
    navigation.push("RehabQuotationScreen", { 
      detail
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
      if (loading || !hasRevisedRehabItems) {
        return null;
      };
      return (
        <Button
          {...props}
          color={primaryButtonColor}
          onPress={!submitted ? handleHeaderRightReviseOnPress : handleHeaderRightCheckOnPress}
          title={!submitted ? "Revise" : "Check Quotation"}
        />
      );
    }
  };
};

export default navigationOptions;