import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodel';
import EnhanceBathroom from '../EnhanceBathroom';

interface MaintainFloorProps  {
  navigation: NavigationStackScreenProps['navigation'];
}

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { navigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("maintainFloor", value);
    switch(value) {
      case "yes":
        navigation.push("BathroomRemodelScreen", { questionScreen: EnhanceBathroom });
        break;
      case "no":
        navigation.push("BathroomRemodelScreen", { questionScreen: EnhanceBathroom });
        break;
      default:
        navigation.navigate("HomeScreen");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Do you plan to maintain the existing floor plan?</Headline>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.maintainFloor === "yes" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("yes")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Yes</Text>
      </Button>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.maintainFloor === "no" ? "check-circle" :"radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("no")}
        contentStyle={styles.buttonContainer}
      >
        <Text>No</Text>
      </Button>
      <View style={styles.viewBox2}/>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MaintainFloor);