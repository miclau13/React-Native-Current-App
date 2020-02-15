import React from 'react';
import { NavigationState, NavigationContainerProps } from "react-navigation"; 
import { HeaderBackButton } from "react-navigation-stack";

import getPreviousStep from './FiximizeQuestionsForm';
import { primaryButtonColor } from "../../../styles/constants";

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  const { navigation } = props;
  const previousStep = navigation.getParam("previousStep");
  const propertyInfo = navigation.getParam("propertyInfo", {});
  const step = navigation.getParam("step");

  const handleHeaderLeftOnPress = () => {
    if(step === "vacant") {
      navigation.navigate("PropertyInfoScreen")
    } else {
      navigation.navigate("FiximizeQuestionsFormScreen", {
        step: previousStep, 
        backFrom: step, 
        previousStep: getPreviousStep(previousStep, propertyInfo) 
      });
    }
  }
  return { 
    headerLeft: (props) => {
      return (
        <HeaderBackButton 
          {...props} 
          onPress={handleHeaderLeftOnPress} 
          tintColor={primaryButtonColor}
        />
      )
    }
  }
};

export default navigationOptions;