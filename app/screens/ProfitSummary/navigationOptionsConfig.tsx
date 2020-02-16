import React from 'react';
import { Button } from 'react-native';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import { primaryButtonColor } from "../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  const arv = navigation.getParam("arv");
  const asIs = navigation.getParam("asIs");
  const step = navigation.getParam("step");
  const submitted = navigation.getParam("submitted");
  const vacant = navigation.getParam("vacant");
  const handleHeaderLeftOnPress = () => {
    step == "summary" ? 
      navigation.navigate("FullRemodelSummaryScreen", { arv, asIs, submitted, vacant }) : 
      navigation.navigate("ProfitSummaryScreen", { step: "summary" });
  };
  const handleHeaderRightOnPress = () => {
    navigation.navigate("HomeScreen");
  };
  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props} 
          onPress={handleHeaderLeftOnPress}
          tintColor={primaryButtonColor}
        />
      )
    },
    headerRight: (props) => {
      if (step == "summary") {
        return (
          <Button 
            {...props}
            color={primaryButtonColor}
            onPress={handleHeaderRightOnPress}
            title="Done"
          />
        )
      }
    },
  }
};

export default navigationOptions;