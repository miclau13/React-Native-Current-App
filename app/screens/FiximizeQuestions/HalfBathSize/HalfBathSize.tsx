import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface HalfBathSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const HalfBathSize: React.ComponentType<HalfBathSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    // console.log("HalfBathSize handleButtonOnPress values", values.halfBathSize)
    // console.log("HalfBathSize handleButtonOnPress errors.halfBathSize", errors.halfBathSize)
    if(errors.halfBathSize) {
      return;
    };
    handleStepNavigation("kitchenCabinetUpperSize");
    // submitForm();
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("HalfBathSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Half Bath Size:</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors.halfBathSize} 
        keyboardType="number-pad"
        label="sq. ft."
        maxLength={8}
        mode="outlined"
        name="halfBathSize"
      />
      <HelperText name="halfBathSize"/>
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
export default React.memo(HalfBathSize);