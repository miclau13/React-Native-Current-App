import React from 'react';
import { Button, View } from 'react-native';
import { NavigationRoute, NavigationScreenConfig } from "react-navigation"; 
import { HeaderBackButton, NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>> = (props) => {
  const { navigation } = props;
  const detail = navigation.getParam("detail", {});
  const keyCameraScreen = navigation.getParam("keyCameraScreen");
  const loading = navigation.getParam("loading", true);
  const rehabId = navigation.getParam("rehabId");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId");
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", {});
  const submitted = navigation.getParam("submitted");
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
      key: "KEY_CreateRehabScreen"
    })
  };
  const handleHeaderRightCheckOnPress = () => {
    navigation.push("RehabQuotationScreen", { 
      detail
    })
  };
  const handleHeaderRightAddPhotoOnPress = () => {
    navigation.push("CameraPhotoAddScreen", 
      { 
        keyCameraScreen,
        rehabId,
      },
      {
        type: 'Navigation/NAVIGATE',
        routeName: "CameraPhotoAddScreen",
        key: "KEY_CameraScreen"
      }
    )
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
      if (!submitted) {
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button
            {...props}
            color={primaryButtonColor}
            onPress={handleHeaderRightAddPhotoOnPress}
            title={"Photos"}
            />
            <Button
              {...props}
              color={primaryButtonColor}
              onPress={handleHeaderRightReviseOnPress}
              title={"Revise"}
            />
          </View>
        )
      };
      if (submitted && !hasRevisedRehabItems) {
        return (
          <Button
          {...props}
          color={primaryButtonColor}
          onPress={handleHeaderRightAddPhotoOnPress}
          title={"Photos"}
          />
        );
      };
      if (submitted && hasRevisedRehabItems) {
        return (
          <Button
            {...props}
            color={primaryButtonColor}
            onPress={handleHeaderRightCheckOnPress}
            title={"Quotation"}
          />
        );
      }
      return null;
    }
  };
};

export default navigationOptions;