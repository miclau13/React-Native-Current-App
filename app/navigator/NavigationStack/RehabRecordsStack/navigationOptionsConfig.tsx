import React from "react";
import { Icon } from "react-native-elements";

import { strings } from "../../../screens/RehabRecords";

const navigationOptions = {
  tabBarLabel: strings.title,
  tabBarIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />,
  drawerLabel: strings.title,
  drawerIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />
};

export default navigationOptions;