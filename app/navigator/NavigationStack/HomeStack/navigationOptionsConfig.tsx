import React from "react";
import { Icon } from "react-native-elements";
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { NavigationBottomTabOptions } from "react-navigation-tabs";

import  { strings } from "../../../screens/Home";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  };

  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  };

  return {
    tabBarVisible,
    drawerLockMode,
    drawerLabel: strings.title,
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-home" type="ionicon" color={tintColor} />
    )as NavigationBottomTabOptions["tabBarIcon"],
    tabBarLabel: strings.title,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" type="ionicon" color={tintColor} />
    ) as NavigationBottomTabOptions["tabBarIcon"],
  };
};

export default navigationOptions;