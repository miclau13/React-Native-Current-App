import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';

interface MaintainFloorProps {
  backFrom: BathroomRemodelFormProps['backFrom'] | KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'] | KitchenRemodelFormProps['handleStepNavigation'];
  remodelType: string;
}

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues & KitchenRemodelFormValues>();
  const { setFieldValue, submitForm, values } = form;
  const { backFrom, handleStepNavigation, remodelType } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("maintainFloor", value);
    switch(value) {
      case "yes":
        if (remodelType === "kitchenRemodel") {
          let handle = handleStepNavigation as KitchenRemodelFormProps['handleStepNavigation'];
          handle("kitchenFloorRemodel");
        } else {
          let handle = handleStepNavigation as BathroomRemodelFormProps['handleStepNavigation'];
          handle("bathroomFloorRemodel");
        };
        break;
      case "no":
        if (remodelType === "kitchenRemodel") {
          let handle = handleStepNavigation as KitchenRemodelFormProps['handleStepNavigation'];
          handle("kitchenEnhance");
        } else {
          let handle = handleStepNavigation as BathroomRemodelFormProps['handleStepNavigation'];
          handle("enhanceBathroom");
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
      {/* {remodelType !== "kitchenRemodel" ? null :
        <Button 
          mode="contained" 
          onPress={handleOnSubmit}
          style={styles.nextButton}
        >
          Submit
        </Button>
      } */}
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(MaintainFloor);