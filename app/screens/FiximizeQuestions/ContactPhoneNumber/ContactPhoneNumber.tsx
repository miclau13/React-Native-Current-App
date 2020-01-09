import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface ContactPhoneNumberProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const ContactPhoneNumber: React.ComponentType<ContactPhoneNumberProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(errors && errors["contactPhoneNumber"]) {
      return;
    };
    submitForm();
  };

  React.useEffect(() => {
    console.log("ContactPhoneNumber Mount")
    if (!!backFrom) {
      // form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("ContactPhoneNumber UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`Enter your phone number for us to contact you: `}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors["contactPhoneNumber"]} 
        keyboardType="number-pad"
        label="Phone Number"
        // maxLength={8}
        mode="outlined"
        name={"contactPhoneNumber"}
      />
      <HelperText name={"contactPhoneNumber"}/>
      <View style={styles.viewBox2}/>
      <Button
        disabled={!!!values[`${"contactPhoneNumber"}`]}
        mode="contained" 
        onPress={handleButtonOnPress}
        style={styles.buttonContainer}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ContactPhoneNumber);