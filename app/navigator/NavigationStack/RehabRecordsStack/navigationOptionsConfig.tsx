import React from "react";
import { Icon } from "react-native-elements";
import { NavigationState, NavigationContainerProps } from "react-navigation"; 

import { strings } from "../../../screens/RehabRecords";

const navigationOptions =  (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
    tabBarLabel: strings.title,
    tabBarIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />,
    drawerLabel: strings.title,
    drawerIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />
  };
};




export default navigationOptions;