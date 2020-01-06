import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';

interface VacantPropertyProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const VacantProperty: React.ComponentType<VacantPropertyProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, setFieldValue, submitForm, values } = form;

  const handleOnPress: ButtonGroupProps['onPress'] = (index) => {
    setFieldValue("vacant", index);
  };

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(errors && errors["vacant"]) {
      return;
    };
    submitForm();
  };

  const buttons = ['NO', 'YES'];
  
  React.useEffect(() => {
    console.log("VacantProperty Mount")
    return () => {console.log("VacantProperty UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Is the property vacant now?</Headline>
      <View style={styles.viewBox1}/>
      <Title style={styles.title}>Vacant?</Title>
      <ButtonGroup
        buttons={buttons}
        onPress={handleOnPress}
        selectedButtonStyle={styles.buttonSelectedContainer}
        selectedIndex={values.vacant}
      />
      <View style={styles.viewBox2}/>
      <Button
        mode="contained" 
        onPress={handleButtonOnPress}
        style={styles.buttonContainer}
      >
        Submit
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(VacantProperty);