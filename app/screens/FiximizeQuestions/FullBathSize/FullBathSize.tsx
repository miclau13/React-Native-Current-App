import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface FullBathSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  field: any;
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const FullBathSize: React.ComponentType<FullBathSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom, field, handleStepNavigation } = props;

  console.log("FullBathSize field", field )

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    // console.log("FullBathSize handleButtonOnPress values", values[field.name])
    // console.log("FullBathSize handleButtonOnPress errors[field.name]", errors[field.name])
    if(errors[field.name]) {
      return;
    };
    handleStepNavigation(field.nextItem);
    // submitForm();
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("FullBathSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`Bathroom Size #${field.description}:`}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors[field.name]} 
        keyboardType="number-pad"
        label="sq. ft."
        maxLength={8}
        mode="outlined"
        name={field.name}
      />
      <HelperText name={field.name}/>
      <View style={styles.viewBox2}/>
      <Button
        mode="contained" 
        onPress={handleButtonOnPress}
        style={styles.buttonContainer}
      >
        {"Next"}
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(FullBathSize);