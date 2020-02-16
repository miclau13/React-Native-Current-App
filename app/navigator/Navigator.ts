import { Platform } from "react-native";
import { createSwitchNavigator} from "react-navigation"; 
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeStack from "./NavigationStack/HomeStack";
import ProfileStack from "./NavigationStack/ProfileStack";
import RehabRecordsStack from "./NavigationStack/RehabRecordsStack";
import LoginStack from "./NavigationStack/LoginStack";
import InitalLoadingScreen from "../screens/InitialLoading";
import LoginScreen from "../screens/Login";

const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, RehabRecordsStack, ProfileStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
  android: createBottomTabNavigator({ HomeStack, RehabRecordsStack, ProfileStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
});

const AuthNavigator = Platform.select({
  ios: createBottomTabNavigator({ LoginStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
  android: createBottomTabNavigator({ LoginStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
});

const RootSwitch = createSwitchNavigator(
  { 
    AuthNavigator,
    InitalLoadingScreen,
    LoginScreen,
    MainNavigator,
  }, 
  { initialRouteName: "InitalLoadingScreen" }
);

export default RootSwitch;