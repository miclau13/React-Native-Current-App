
import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { createSwitchNavigator, NavigationState, NavigationContainerProps } from "react-navigation"; 
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createBottomTabNavigator, NavigationBottomTabOptions } from "react-navigation-tabs";

import AutocompleteScreen  from "../screens/FiximizeQuestions/Autocomplete/Autocomplete";
import CameraScreen, { strings as cameraStrings } from "../screens/Camera";
import CurrentLocationScreen from "../screens/CurrentLocation";
import FiximizeQuestionsFormScreen, { getPreviousStep as getFiximizeQuestionsPreviousStep } from "../screens/FiximizeQuestions/FiximizeQuestionsForm";
import HomeScreen, { strings as homeStrings } from "../screens/Home";
import InitalLoadingScreen from "../screens/InitialLoading";
import LoginScreen, { strings as loginStrings } from "../screens/Login";
import LoginCheckingScreen from "../screens/LoginChecking";
import PasswordResetScreen from "../screens/PasswordReset";
import ProfitSummaryScreen from "../screens/ProfitSummary";
import PropertyInfoScreen from "../screens/PropertyInfo";
import FullRemodelSummaryScreen from "../screens/FullRemodelSummary";
import RegisterScreen, { strings as registerStrings } from "../screens/Register";
import SettingsScreen, { strings as settingsStrings } from "../screens/Settings";

const IOS_MODAL_ROUTES = ["OptionsScreen"];

// const dynamicModalTransition: NavigationStackConfig["transitionConfig"] = (transitionProps, prevTransitionProps) => {
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
  { AutocompleteScreen, HomeScreen, PropertyInfoScreen, 
    FiximizeQuestionsFormScreen: {
      screen: FiximizeQuestionsFormScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const previousStep = navigation.getParam("previousStep");
        const propertyInfo = navigation.getParam("propertyInfo", {});
        const step = navigation.getParam("step");

        const handleOnPress = () => {
          if(step === "beds1") {
            navigation.navigate("PropertyInfoScreen")
          } else {
            navigation.navigate("FiximizeQuestionsFormScreen", 
            { 
              step: previousStep, 
              backFrom: step, 
              previousStep: getFiximizeQuestionsPreviousStep(previousStep, propertyInfo) 
            });
          }
        }
        return { 
          headerLeft: (props) => {
            return (
              <HeaderBackButton 
                {...props} 
                onPress={handleOnPress} 
              />
            )
          }
        }
      }
    },
    FullRemodelSummaryScreen: {
      screen: FullRemodelSummaryScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        return { 
          headerLeft: null,
        }
      }
    },
    ProfitSummaryScreen: {
      screen: ProfitSummaryScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const arv = navigation.getParam("arv");
        const asIs = navigation.getParam("asIs");
        const step = navigation.getParam("step");
        return { 
          headerLeft: step === "summary" ? 
            (props) => <HeaderBackButton {...props} onPress={() => {
              navigation.navigate("FullRemodelSummaryScreen", { arv, asIs });
            }}/> : 
            (props) => <HeaderBackButton {...props} onPress={() => {
              navigation.navigate("ProfitSummaryScreen", { step: "summary" });
            }}/>,
          headerRight: step === "summary" ? (props) => {
            return (
              <Button 
                {...props}
                onPress={() => {
                  navigation.navigate("HomeScreen");
                }}
              >
                Done
              </Button> 
            )
          } : null
        }
      }
    },
  },
  { initialRouteName: "HomeScreen" }
);

HomeStack.navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
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
    drawerLabel: homeStrings.homeTitle,
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-home" type="ionicon" color={tintColor} />
    )as NavigationBottomTabOptions["tabBarIcon"],
    tabBarLabel: homeStrings.homeTitle,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" type="ionicon" color={tintColor} />
    ) as NavigationBottomTabOptions["tabBarIcon"],
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
  ios: createBottomTabNavigator({ HomeStack, SettingsStack }, {
    resetOnBlur: true,
  }),
  android: createBottomTabNavigator({ HomeStack, SettingsStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
});

// Login Stack Start
const LoginStack = createStackNavigator(
  { LoginScreen, PasswordResetScreen }, 
  { initialRouteName: "LoginScreen" }
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

RegisterScreen.navigationOptions = {
  tabBarLabel: registerStrings.registerTitle,
  tabBarIcon: ({ tintColor }) => {
    let iconName = Platform.select({ ios: "ios-person-add", android: "md-person-add" });
    return <Icon name={iconName} type="ionicon" color={tintColor} />;
  }
};

// const AuthTabs = createBottomTabNavigator({ LoginStack, RegisterScreen });
const AuthTabs = createBottomTabNavigator({ LoginStack });

const RootSwitch = createSwitchNavigator(
  { 
    AuthTabs,
    InitalLoadingScreen,
    LoginCheckingScreen,
    LoginScreen,
    MainNavigator,
  }, 
  {
    initialRouteName: "InitalLoadingScreen",
  }
);

export default RootSwitch;