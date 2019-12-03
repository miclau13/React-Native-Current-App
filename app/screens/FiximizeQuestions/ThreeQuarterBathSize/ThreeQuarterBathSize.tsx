import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface ThreeQuarterBathSizeProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  field: any;
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const ThreeQuarterBathSize: React.ComponentType<ThreeQuarterBathSizeProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, values } = form;
  const { backFrom, field, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(errors && errors["threeQuarterBaths"] && errors["threeQuarterBaths"][field.name]) {
      return;
    };
    handleStepNavigation(field.nextItem);
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("ThreeQuarterBathSize UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>{`3/4 Size #${field.description}:`}</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors["threeQuarterBaths"] && errors["threeQuarterBaths"][field.name]} 
        keyboardType="number-pad"
        label="sq. ft."
        maxLength={8}
        mode="outlined"
        name={`threeQuarterBaths.${field.name}`}
      />
      <HelperText name={`threeQuarterBaths.${field.name}`}/>
      <View style={styles.viewBox2}/>
      <Button
        disabled={!!!values["threeQuarterBaths"][`${field.name}`]}
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
export default React.memo(ThreeQuarterBathSize);