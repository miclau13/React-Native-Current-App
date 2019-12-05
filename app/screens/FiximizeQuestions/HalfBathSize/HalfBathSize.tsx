import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface halfBathSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  field: any;
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const halfBathSize: React.ComponentType<halfBathSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, values } = form;
  const { backFrom, field, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(errors && errors["halfBaths"] && errors["halfBaths"][field.name]) {
      return;
    };
    handleStepNavigation(field.nextItem);
  };

  React.useEffect(() => {
    if (!!backFrom) {
      if (backFrom.includes("halfBaths")) {
        form.setFieldValue(`halfBaths.${backFrom}`, form.initialValues["halfBaths"][backFrom]);
      } else if (backFrom.includes("asIsEstimate")) {
        form.setFieldValue(backFrom, form.initialValues[backFrom]);
      }
    };
    return () => {console.log("halfBathSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`Half Bath Size #${field.description}:`}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors["halfBaths"] && errors["halfBaths"][field.name]} 
        keyboardType="number-pad"
        label="sq. ft."
        maxLength={8}
        mode="outlined"
        name={`halfBaths.${field.name}`}
      />
      <HelperText name={`halfBaths.${field.name}`}/>
      <View style={styles.viewBox2}/>
      <Button
        disabled={!!!values["halfBaths"][`${field.name}`]}
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
export default React.memo(halfBathSize);