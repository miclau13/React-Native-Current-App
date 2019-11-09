import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';
import HelperText from '../../components/Formik/HelperText';
import NumberInput from '../../components/NumberInput';

interface KitchenCabinetRemodelProps {
  backFrom: KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: KitchenRemodelFormProps['handleStepNavigation'];
};

const KitchenCabinetRemodel: React.ComponentType<KitchenCabinetRemodelProps> = (props) => {
  const form = useFormikContext<KitchenRemodelFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    console.log("KitchenCabinetReomdel handleButtonOnPress values", values.kitchenCabinetRemodel)
    console.log("KitchenCabinetReomdel handleButtonOnPress errors.kitchenCabinetRemodel", errors.kitchenCabinetRemodel)
    if(errors.kitchenCabinetRemodel || (values.kitchenCabinetRemodel.feet.toString() === "0" && values.kitchenCabinetRemodel.inches.toString() === "0")) {
      return;
    };

    submitForm();
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("KitchenCabinetReomdel UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Length of Kitchen Cabinet needed:</Headline>
      <View style={styles.viewBox1}/>
      <NumberInput
        autoFocus
        error={errors && errors.kitchenCabinetRemodel && !!errors.kitchenCabinetRemodel.feet} 
        keyboardType="number-pad"
        label="Feet"
        maxLength={2}
        mode="outlined"
        name="kitchenCabinetRemodel.feet"
      />
      <HelperText name="kitchenCabinetRemodel.feet"/>
      <NumberInput
        error={errors && errors.kitchenCabinetRemodel && !!errors.kitchenCabinetRemodel.inches} 
        keyboardType="number-pad"
        label="Inches"
        name="kitchenCabinetRemodel.inches"
        maxLength={2}
        mode="outlined"
      />
      <HelperText name="kitchenCabinetRemodel.inches"/>
      <View style={styles.viewBox2}/>
      <Button
        mode="contained" 
        onPress={handleButtonOnPress}
        style={styles.buttonContainer}
      >
        {"Submit"}
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(KitchenCabinetRemodel);