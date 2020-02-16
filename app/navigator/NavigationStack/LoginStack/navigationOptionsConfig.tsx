import React from "react";
import { Platform } from "react-native"
import { Icon } from "react-native-elements";
import { NavigationState, NavigationContainerProps } from "react-navigation"; 

import { strings } from "../../../screens/Login";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: strings.title,
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-log-in", android: "md-log-in" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    },
  };
};

export default navigationOptions;