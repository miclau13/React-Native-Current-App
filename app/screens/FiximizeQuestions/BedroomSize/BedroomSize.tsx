import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface BedroomSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  field: any;
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const BedroomSize: React.ComponentType<BedroomSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, values } = form;
  const { backFrom, field, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(errors && errors["beds"] && errors["beds"][field.name]) {
      return;
    };
    handleStepNavigation(field.nextItem);
  };

  React.useEffect(() => {
    if (!!backFrom) {
      if (backFrom.includes("beds")) {
        form.setFieldValue(`beds.${backFrom}`, form.initialValues["beds"][backFrom]);
      } else if (backFrom.includes("fullBaths")) {
        form.setFieldValue(`fullBaths.${backFrom}`, form.initialValues["fullBaths"][backFrom]);
      }
    };
    return () => {console.log("BedroomSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`Bedroom Size #${field.description}:`}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors["beds"] && errors["beds"][field.name]} 
        keyboardType="number-pad"
        label="sq. ft."
        maxLength={8}
        mode="outlined"
        name={`beds.${field.name}`}
      />
      <HelperText name={`beds.${field.name}`}/>
      <View style={styles.viewBox2}/>
      <Button
        disabled={!!!values["beds"][`${field.name}`]}
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
export default React.memo(BedroomSize);