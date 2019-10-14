import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text, Title } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';
import EnhanceBathroom from '../EnhanceBathroom';
import BathroomFloorRemodel from '../BathroomFloorRemodel';

interface MaintainFloorProps  {
  navigation: NavigationStackScreenProps['navigation'];
}

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  console.log("hi MaintainFloor");
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { navigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("maintainFloor", value);
    switch(value) {
      case "yes":
        navigation.push("BathroomRemodelFormScreen", { questionScreen: BathroomFloorRemodel });
        break;
      case "no":
        navigation.push("BathroomRemodelFormScreen", { questionScreen: EnhanceBathroom });
        break;
      default:
        navigation.navigate("HomeScreen");
    }
  }

  // console.log("maintain floor",form.values)

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Do you plan to maintain or change the existing floor plan?</Headline>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.maintainFloor === "yes" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("yes")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Maintain</Text>
      </Button>
      <View style={{ height: 8 }}/>
      <Button
        icon={values.maintainFloor === "no" ? "check-circle" :"radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("no")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Change</Text>
      </Button>
      <View style={styles.viewBox2}/>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MaintainFloor);