
import React from "react";
import { Platform } from 'react-native';
import { Icon } from "react-native-elements";
import { createSwitchNavigator, NavigationScreenProp, NavigationState, NavigationContainerProps } from 'react-navigation'; 
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, NavigationStackProp, NavigationStackOptions, StackViewTransitionConfigs, NavigationStackConfig } from 'react-navigation-stack';
import { createBottomTabNavigator, NavigationBottomTabOptions } from 'react-navigation-tabs';

import BurgerMenu from "../components/BurgerMenu";
import AuthLoadingScreen from '../screens/AuthLoading';
import BathroomRemodelScreen from "../screens/BathroomRemodel";
import CurrentLocationScreen from "../screens/CurrentLocation";
import DetailScreen from "../screens/Detail";
import HomeScreen, { strings as homeStrings } from "../screens/Home";
import LoginScreen, { strings as loginStrings } from "../screens/Login";
import OptionsScreen from "../screens/Options";
import PasswordResetScreen from "../screens/PasswordReset";
import RegisterScreen, { strings as registerStrings } from "../screens/Register";
import SettingsScreen, { strings as settingsStrings } from "../screens/Settings";
import EnhanceBathroomQuestionScreen, { strings as enhanceBathroomScreenQuestionStrings } from "../screens/EnhanceBathroom";
import ZipCodeQuestionScreen, { strings as zipCodeQuestionStrings } from "../screens/ZipCode";
import MaintainFloorQuestionScreen, { strings as maintainFloorQuestionStrings } from "../screens/MaintainFloor";

const IOS_MODAL_ROUTES = ['OptionsScreen'];

// const dynamicModalTransition: NavigationStackConfig['transitionConfig'] = (transitionProps, prevTransitionProps) => {
//   const isModal = IOS_MODAL_ROUTES.some(
//     screenName =>
//       screenName === transitionProps.scene.route.routeName ||
//       (prevTransitionProps &&
//         screenName === prevTransitionProps.scene.route.routeName)
//   );
//   return StackViewTransitionConfigs.defaultTransitionConfig(
//     transitionProps,
//     prevTransitionProps,
//     isModal
//   );
// };

// HomeStack Start
const HomeStack = createStackNavigator(
  { BathroomRemodelScreen, DetailScreen, HomeScreen, CurrentLocationScreen, OptionsScreen },
  { initialRouteName: 'HomeScreen' }
);

HomeStack.navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  }

  return {
    tabBarVisible,
    drawerLockMode,
    tabBarLabel: homeStrings.homeTitle,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" type="ionicon" color={tintColor} />
    ) as NavigationBottomTabOptions['tabBarIcon'],
    drawerLabel: homeStrings.homeTitle,
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-home" type="ionicon" color={tintColor} />
    )as NavigationBottomTabOptions['tabBarIcon'],
  };
};
// HomeStack End

// SettingsStack Start
const SettingsStack = createStackNavigator({ SettingsScreen });

SettingsStack.navigationOptions = {
  tabBarLabel: settingsStrings.settingsTitle,
  tabBarIcon: ({ tintColor }) => <Icon name="ios-cog" type="ionicon" color={tintColor} />,
  drawerLabel: settingsStrings.settingsTitle,
  drawerIcon: ({ tintColor }) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};
// SettingsStack End

const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, SettingsStack }),
  android: createDrawerNavigator({ HomeStack, SettingsStack }, { contentComponent: BurgerMenu })
});

// Login Stack Start
const LoginStack = createStackNavigator(
  { LoginScreen, PasswordResetScreen }, 
  { initialRouteName: 'LoginScreen' }
);

LoginStack.navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: loginStrings.loginTitle,
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-log-in", android: "md-log-in" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    },
  };
};
// Login Stack End

// RemodelQuestionsStack Start
const RemodelQuestionsStack = createStackNavigator(
  { BathroomRemodelScreen, ZipCodeQuestionScreen, MaintainFloorQuestionScreen, EnhanceBathroomQuestionScreen }, 
  { initialRouteName: 'BathroomRemodelScreen' }
);
// RemodelQuestionsStack End

RegisterScreen.navigationOptions = {
  tabBarLabel: registerStrings.registerTitle,
  tabBarIcon: ({ tintColor }) => {
    let iconName = Platform.select({ ios: "ios-person-add", android: "md-person-add" });
    return <Icon name={iconName} type="ionicon" color={tintColor} />;
  }
};

const AuthTabs = createBottomTabNavigator({ LoginStack, RegisterScreen });

const RootSwitch = createSwitchNavigator(
  { 
    AuthTabs, 
    MainNavigator,
    RemodelQuestionsStack,
    AuthLoading: AuthLoadingScreen, 
  }, 
  {
    initialRouteName: 'AuthLoading',
  }
);

export default RootSwitch;