import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface KitchenCabinetSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  field: any;
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const KitchenCabinetSize: React.ComponentType<KitchenCabinetSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom, field, handleStepNavigation } = props;

  console.log("KitchenCabinetSize field", field )

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    // console.log("KitchenCabinetSize handleButtonOnPress values", values[field.name])
    // console.log("KitchenCabinetSize handleButtonOnPress errors[field.name]", errors[field.name])
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
    return () => {console.log("KitchenCabinetSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`Kitchen Cabinet ${field.description} Length:`}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors[field.name]} 
        keyboardType="number-pad"
        label="linear ft."
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
export default React.memo(KitchenCabinetSize);