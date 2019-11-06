import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text, Title } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface MaintainFloorProps {
  backFrom: BathroomRemodelFormProps['backFrom'];
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
  remodelType: string;
}

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, submitForm, values } = form;
  const { backFrom, handleStepNavigation, remodelType } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("maintainFloor", value);
    switch(value) {
      case "yes":
        if (remodelType === "kitchenRemodel") {
          // submitForm();
        } else {
          handleStepNavigation("bathroomFloorRemodel");
        };
        break;
      case "no":
        if (remodelType === "kitchenRemodel") {
          // console.log("hi Miantain floor ")
          // submitForm();
        } else {
          handleStepNavigation("enhanceBathroom");
        };
        break;
      default:
        // navigation.navigate("HomeScreen");
    }
  };

  const handleOnSubmit: ButtonProps['onPress'] = () => {
    submitForm();
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("MaintainFloor UnMount")}
  }, []);

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
      {remodelType !== "kitchenRemodel" ? null :
        <Button 
          mode="contained" 
          onPress={handleOnSubmit}
          style={styles.nextButton}
        >
          Submit
        </Button>
      }
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MaintainFloor);