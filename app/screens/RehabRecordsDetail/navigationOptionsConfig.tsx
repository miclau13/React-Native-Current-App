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
  const hasRevisedRehabItems = !!detail.rehabItemsPackage.revisedRehabItems;
  const flow = !hasRevisedRehabItems ? "revise" : null;

  const handleHeaderRightReviseOnPress = () => {
    navigation.push("CreateRehabScreen", 
    { 
      flow,
      rehabId,
      rehabItemPackageId,
      createRehabNoArvInput: revisedRehabInfo,
    }, 
    {
      type: 'Navigation/NAVIGATE',
      routeName: "CreateRehabScreen",
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
      if (loading) {
        return null;
      };
      if (!hasRevisedRehabItems) {
        return (
          <Button
            {...props}
            color={primaryButtonColor}
            onPress={handleHeaderRightReviseOnPress}
            title={"Revise"}
          />
        )
      };
      return (
        <Button
          {...props}
          color={primaryButtonColor}
          onPress={handleHeaderRightCheckOnPress}
          title={"Quotation"}
        />
      );
    }
  };
};

export default navigationOptions;