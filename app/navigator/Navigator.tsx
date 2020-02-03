
import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { createSwitchNavigator, NavigationState, NavigationContainerProps } from "react-navigation"; 
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { BottomTabBar, createBottomTabNavigator, NavigationBottomTabOptions } from "react-navigation-tabs";

import ArvEstimateScreen from "../screens/ArvEstimate";
import AsIsEstimateScreen from "../screens/AsIsEstimate";
import AutocompleteScreen  from "../screens/FiximizeQuestions/Autocomplete/Autocomplete";
import FiximizeQuestionsFormScreen, { getPreviousStep as getFiximizeQuestionsPreviousStep } from "../screens/FiximizeQuestions/FiximizeQuestionsForm";
import FullRemodelSummaryScreen from "../screens/FullRemodelSummary";
import HomeScreen, { strings as homeStrings } from "../screens/Home";
import InitalLoadingScreen from "../screens/InitialLoading";
import LoginScreen, { strings as loginStrings } from "../screens/Login";
import ProfileScreen, { strings as profileStrings } from "../screens/Profile";
import ProfitSummaryScreen from "../screens/ProfitSummary";
import PropertyInfoScreen from "../screens/PropertyInfo";
import RehabRecordsScreen, { strings as rehabRecordStrings } from "../screens/RehabRecords";
import RehabRecordsDetailScreen from "../screens/RehabRecordsDetail";
import TotalDebtsScreen from "../screens/TotalDebts";

// HomeStack Start
const HomeStack = createStackNavigator(
  { ArvEstimateScreen, AsIsEstimateScreen, AutocompleteScreen, HomeScreen, TotalDebtsScreen,
    FiximizeQuestionsFormScreen: {
      screen: FiximizeQuestionsFormScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const previousStep = navigation.getParam("previousStep");
        const propertyInfo = navigation.getParam("propertyInfo", {});
        const step = navigation.getParam("step");

        const handleOnPress = () => {
          if(step === "vacant") {
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
        const submitted = navigation.getParam("submitted");
        const vacant = navigation.getParam("vacant");
        return { 
          headerLeft: step === "summary" ? 
            (props) => <HeaderBackButton {...props} onPress={() => {
              navigation.navigate("FullRemodelSummaryScreen", { arv, asIs, submitted, vacant });
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
    PropertyInfoScreen: {
      screen: PropertyInfoScreen,
      navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
        const { navigation } = props;
        const step = navigation.getParam("step");
        return { 
          headerRight: step === "summary" ? (props) => {
            return (
              <Button 
                {...props}
                onPress={() => {
                  navigation.navigate("PropertyInfoScreen", { step: "edit" });
                }}
              >
                Edit
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

// ProfileStack Start
const ProfileStack = createStackNavigator({ ProfileScreen });

ProfileStack.navigationOptions = {
  tabBarLabel: profileStrings.title,
  tabBarIcon: ({ tintColor }) => <Icon name="user-circle" type="font-awesome" color={tintColor} />,
  drawerLabel: profileStrings.title,
  drawerIcon: ({ tintColor }) => <Icon name="user-circle" type="font-awesome" color={tintColor} />
};
// ProfileStack End

// RehabRecordsStack Start
const RehabRecordsStack = createStackNavigator({ 
  RehabRecordsDetailScreen,
  RehabRecordsScreen: {
    screen: RehabRecordsScreen,
    navigationOptions: (props: NavigationContainerProps<NavigationState>) => {
      const { navigation } = props;
      const deleteMode = navigation.getParam("deleteMode", false);
      const lengthOfSelectedRehabRecords = navigation.getParam("lengthOfSelectedRehabRecords", 0);
      const loading = navigation.getParam("loading", true);

      const handleHeaderRightOnPress = () => {
        navigation.setParams({ deleteMode: !deleteMode });
      };
      const handleHeaderLeftOnPress = () => {
        navigation.setParams({ openConfirmModal: true });
      };
      return { 
        headerLeft: (props) => {
          if (!deleteMode) {
            return null;
          };
          return (
            <Button
              onPress={handleHeaderLeftOnPress}
            >
              Delete
            </Button>
          )
        },
        headerRight: (props) => {
          if (loading) {
            return null;
          };
          return (
            <Button
              onPress={handleHeaderRightOnPress}
            >
              { !deleteMode ? "Select" : "Cancel" }
            </Button>
          )
        },
        headerTitle: deleteMode ?
          lengthOfSelectedRehabRecords ? `${lengthOfSelectedRehabRecords} Record(s) Selected` : "Select Records"
          : null,
      }
    }
  }}, { initialRouteName: "RehabRecordsScreen" });

RehabRecordsStack.navigationOptions = {
  tabBarLabel: rehabRecordStrings.title,
  tabBarIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />,
  drawerLabel: rehabRecordStrings.title,
  drawerIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />
};
// RehabRecordsStack End

// RehabRecordsDeleteStack Start
const RehabRecordsDeleteStack = createStackNavigator({
  RehabRecordsScreen
});

RehabRecordsDeleteStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ tintColor }) => <Icon name="delete-outline" type="material-community" color="red" />,
  tabBarOnPress: ({ navigation }) => {
    console.log("tabBarOnPress navigation", navigation)
    navigation.setParams({ openConfirmModal: true });
  },
  // drawerLabel: rehabRecordStrings.title,
  // drawerIcon: ({ tintColor }) => <Icon name="history" color={tintColor} />
};
// RehabRecordsStack End

const MainNavigator = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, RehabRecordsStack, ProfileStack }, {
    resetOnBlur: true,
  }),
  android: createBottomTabNavigator({ HomeStack, RehabRecordsStack, ProfileStack }, {
    lazy: false,
    resetOnBlur: true,
  }),
});

// Login Stack Start
const LoginStack = createStackNavigator(
  { LoginScreen }, 
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
    tabBarLabel: loginStrings.title,
    tabBarIcon: ({ tintColor }) => {
      let iconName = Platform.select({ ios: "ios-log-in", android: "md-log-in" });
      return <Icon name={iconName} type="ionicon" color={tintColor} />;
    },
  };
};
// Login Stack End

// const AuthTabs = createBottomTabNavigator({ LoginStack, RegisterScreen });
const AuthTabs = createBottomTabNavigator({ LoginStack });

const RootSwitch = createSwitchNavigator(
  { 
    AuthTabs,
    InitalLoadingScreen,
    LoginScreen,
    MainNavigator,
  }, 
  {
    initialRouteName: "InitalLoadingScreen",
  }
);

export default RootSwitch;