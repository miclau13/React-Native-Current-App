
import React from "react";
import { Platform } from 'react-native';
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { createSwitchNavigator, NavigationState, NavigationContainerProps } from 'react-navigation'; 
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createBottomTabNavigator, NavigationBottomTabOptions } from 'react-navigation-tabs';

import BurgerMenu from "../components/BurgerMenu";
import AuthLoadingScreen from '../screens/AuthLoading';
import BathroomRemodelFormScreen from "../screens/BathroomRemodelForm";
import CameraScreen, { strings as cameraStrings } from "../screens/Camera";
import CurrentLocationScreen from "../screens/CurrentLocation";
import DetailScreen from "../screens/Detail";
import HomeScreen, { strings as homeStrings } from "../screens/Home";
import KitchenRemodelFormScreen from '../screens/KitchenRemodelForm';
import LoginScreen, { strings as loginStrings } from "../screens/Login";
import OptionsScreen from "../screens/Options";
import PasswordResetScreen from "../screens/PasswordReset";
import PricingScreen from "../screens/Pricing";
import RegisterScreen, { strings as registerStrings } from "../screens/Register";
import SettingsScreen, { strings as settingsStrings } from "../screens/Settings";

import { getPreviousStep as getBathroomRemodelPreviousStep } from "../screens/BathroomRemodelForm";
import { getPreviousStep as getCameraPreviousStep } from "../screens/Camera";
import { getPreviousStep as getKitchenRemodelPreviousStep } from "../screens/KitchenRemodelForm";

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
  { AuthLoadingScreen, CurrentLocationScreen, DetailScreen, HomeScreen, OptionsScreen,
    BathroomRemodelFormScreen: {
      screen: BathroomRemodelFormScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const previousStep = navigation.getParam("previousStep");
        const route = navigation.getParam("route");
        const step = navigation.getParam("step");
        return { 
          headerLeft: (props) => {
            return (
              <HeaderBackButton 
                {...props} 
                backTitleVisible={false} 
                onPress={() => {
                  if(step === "zipCode") {
                    navigation.goBack(navigation.state.key)
                  } else {
                    navigation.navigate("BathroomRemodelFormScreen", { step: previousStep, backFrom: step, previousStep: getBathroomRemodelPreviousStep(previousStep, route) });
                  }
                }} 
              />
            )
          }
        }
      }
    },
    CameraScreen: {
      screen: CameraScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const step = navigation.getParam("step");
        const previousStep = navigation.getParam("previousStep");
        const selectedPhotos = navigation.getParam("selectedPhotos", []);
        const isStepGallery = step === "gallery";
        // console.log("navigator camera navigation", navigation.state)
        return { 
          headerLeft: !isStepGallery ? null : (props) => {
            return (
              <HeaderBackButton 
                {...props} 
                backTitleVisible={false} 
                onPress={() => {
                  navigation.navigate("CameraScreen", { step: previousStep, previousStep: getCameraPreviousStep(previousStep) });
                }} 
              />
            )
          },
          headerRight: (props) => {
            return (
              <Button 
                {...props}
                onPress={() => {
                  // navigation.navigate("AuthLoadingScreen", { selectedPhotos, "redirectTo": "PricingScreen" })
                  navigation.navigate("HomeScreen")
                }}
              >
                {isStepGallery ? "Done" : "Skip"}
              </Button> 
            ) 
          }
        }
      }
    },
    KitchenRemodelFormScreen: {
      screen: KitchenRemodelFormScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const previousStep = navigation.getParam("previousStep");
        const route = navigation.getParam("route");
        const step = navigation.getParam("step");
        return { 
          headerLeft: (props) => {
            return (
              <HeaderBackButton 
                {...props} 
                backTitleVisible={false} 
                onPress={() => {
                  if(step === "zipCode") {
                    navigation.goBack(navigation.state.key)
                  } else {
                    navigation.navigate("KitchenRemodelFormScreen", { step: previousStep, backFrom: step, previousStep: getKitchenRemodelPreviousStep(previousStep, route) });
                  }
                }} 
              />
            )
          }
        }
      }
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        return { 
          headerLeft: (props) => {
            return (
              <HeaderBackButton 
                {...props} 
                backTitleVisible={false} 
              />
            )
          }
        }
      }
    },
    PricingScreen: {
      screen: PricingScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        return { 
          headerLeft: null,
        }
      }
    },
},
  { initialRouteName: 'HomeScreen' }
);

HomeStack.navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  let tabBarVisible = true;
  const isPricingPage = navigation.state.routes.filter(route => route.routeName === "PricingScreen").length > 0;
  if (navigation.state.index > 0 && !isPricingPage) {
    tabBarVisible = false;
  };

  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  };

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
  android: createBottomTabNavigator({ HomeStack, SettingsStack }),
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
    AuthLoading: AuthLoadingScreen, 
  }, 
  {
    initialRouteName: 'MainNavigator',
  }
);

export default RootSwitch;