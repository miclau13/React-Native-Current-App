import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import HelperText from '../../../components/Formik/HelperText';
import NumberInput from '../../../components/NumberInput';

interface AsIsEstimateProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

const AsIsEstimate: React.ComponentType<AsIsEstimateProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    // console.log("AsIsEstimate handleButtonOnPress values", values.asIsEstimate)
    // console.log("AsIsEstimate handleButtonOnPress errors.asIsEstimate", errors.asIsEstimate)
    if(errors.asIsEstimate) {
      return;
    };

    handleStepNavigation("halfBathSize");
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("AsIsEstimate UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>As-Is Estimate:</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors.asIsEstimate} 
        keyboardType="number-pad"
        label="$"
        maxLength={8}
        mode="outlined"
        name="asIsEstimate"
      />
      <HelperText name="asIsEstimate"/>
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
export default React.memo(AsIsEstimate);