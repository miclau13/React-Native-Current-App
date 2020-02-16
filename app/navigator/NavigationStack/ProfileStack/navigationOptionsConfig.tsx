import React from "react";
import { Icon } from "react-native-elements";

import { strings } from "../../../screens/Profile";

const navigationOptions = {
  tabBarLabel: strings.title,
  tabBarIcon: ({ tintColor }) => <Icon name="user-circle" type="font-awesome" color={tintColor} />,
  drawerLabel: strings.title,
  drawerIcon: ({ tintColor }) => <Icon name="user-circle" type="font-awesome" color={tintColor} />
};

export default navigationOptions;