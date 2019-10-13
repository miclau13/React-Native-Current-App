import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonProps, Headline } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodel';
import { TextInput, TextInputProps } from '../../components/Formik/TextInput';

type Params = {};

type ScreenProps = {};

interface MaintainFloorProps  {

}

const validate = (value: string) => {
  // if (value.length === 5 && !zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCodeInput = (props: TextInputProps) => {
  return <TextInput validate={validate} {...props} />;
};

const MaintainFloor: React.ComponentType<MaintainFloorProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { errors } = form;

  const nextButtonOnPress: ButtonProps['onPress'] = (event) => {
    console.log({errors})
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>Do you plan to maintain the existing floor plan?</Headline>
      <View style={styles.viewBox1}/>
      {/* <ZipCodeInput
        autoFocus
        error={errors && !!errors.zipCode} 
        keyboardType="number-pad"
        label="Zip Code"
        name="zipCode"
        maxLength={5}
        mode="outlined"
        textContentType="postalCode"
        validate={validate}
      /> */}
    </KeyboardAvoidingView>
  );
}
export default React.memo(MaintainFloor);