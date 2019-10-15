import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface EnhanceBathroomProps  {
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
}

const EnhanceBathroom: React.ComponentType<EnhanceBathroomProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("enhanceBathroom", value);
    handleStepNavigation("bathroomRemodel");
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