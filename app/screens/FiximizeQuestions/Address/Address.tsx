import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';

import HelperText from '../../../components/Formik/HelperText';
import AddressInput from '../../../components/AddressInput';

interface AddressProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
}

// const validate = (value: string) => {
//   if (!addressList.includes(value)) return 'Invalid Zip Code';
// };

const Address: React.ComponentType<AddressProps> = (props) => {
  const { backFrom, handleStepNavigation } = props;
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, setFieldValue, values } = form;
  
  const handleOnPress: ButtonProps['onPress'] = () => {
    if(!!errors.address || !values.address) {
      return;
    }
    setFieldValue("address", values.address);
    handleStepNavigation("asIsEstimate");
    // switch (remodelType) {
    //   case "bathroomRemodel": 
    //     handleStepNavigation("maintainFloor");
    //     break;
    //   case "kitchenRemodel": 
    //     handleStepNavigation("maintainFloor");
    //     break;
    // };
  };

  React.useEffect(() => {
    if (!!backFrom) {
      // form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("Address UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>What's the address of your property?</Headline>
      <View style={styles.viewBox1}/>
      <AddressInput
        autoFocus
        error={errors && !!errors.address} 
        keyboardType="default"
        label="Address"
        name="address"
        mode="outlined"
        textContentType="fullStreetAddress"
        // validate={validate}
      />
      <HelperText name="address"/>
      <View style={styles.viewBox2}/>
      <Button 
        mode="contained" 
        onPress={handleOnPress}
        style={styles.nextButton}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(Address);