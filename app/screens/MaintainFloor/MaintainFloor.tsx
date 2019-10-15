import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text, Title } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface MaintainFloorProps  {
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
}

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("maintainFloor", value);
    switch(value) {
      case "yes":
        handleStepNavigation("bathroomFloorRemodel");
        break;
      case "no":
        handleStepNavigation("enhanceBathroom");
        break;
      default:
        // navigation.navigate("HomeScreen");
    }
  }

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