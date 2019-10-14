import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface EnhanceBathroomProps  {
  navigation: NavigationStackScreenProps['navigation'];
}

const EnhanceBathroom: React.ComponentType<EnhanceBathroomProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { navigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("enhanceBathroom", value);
    switch(value) {
      // case "yes":
      //   navigation.push("BathroomRemodelScreen", { questionScreen: EnhanceBathroom });
      //   break;
      // case "no":
      //   navigation.push("BathroomRemodelScreen", { questionScreen: EnhanceBathroom });
      //   break;
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
      <Headline>What would you like to enhance?</Headline>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.enhanceBathroom === "add" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("add")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Add a completely new bathroom</Text>
      </Button>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.enhanceBathroom === "expand" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("expand")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Expand half bath to full bath</Text>
      </Button>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.enhanceBathroom === "alter" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("alter")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Another type of expansion/alteration</Text>
      </Button>
      <View style={styles.viewBox2}/>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(EnhanceBathroom);