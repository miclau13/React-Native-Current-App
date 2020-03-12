import { Platform } from "react-native";
import { createSwitchNavigator} from "react-navigation"; 
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeStack from "./NavigationStack/HomeStack";
import ProfileStack from "./NavigationStack/ProfileStack";
import RehabRecordsStack from "./NavigationStack/RehabRecordsStack";

const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ HomeStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
  android: createBottomTabNavigator({ HomeStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
});

const RootSwitch = createSwitchNavigator(
  { 
    MainNavigator,
  }, 
  { initialRouteName: "MainNavigator" }
);

export default RootSwitch;