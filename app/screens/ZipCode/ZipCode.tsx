import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import { BathroomRemodelFormValues } from '../BathroomRemodel';
import MaintainFloor from '../MaintainFloor';
import TextInput, { TextInputProps } from '../../components/Formik/TextInput';
import HelperText  from '../../components/Formik/HelperText';

interface ZipCodeProps {
  navigation: NavigationStackScreenProps['navigation'];
}

const validate = (value: string) => {
  if (!zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCodeInput = (props: TextInputProps) => {
  return <TextInput validate={validate} {...props} />;
};

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  console.log("hi Zip Code")
  const { navigation: { navigate } } = props;
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { errors } = form;

  const nextButtonOnPress: ButtonProps['onPress'] = (event) => {
    navigate("BathroomRemodelScreen", { questionScreen: MaintainFloor });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>What's your project's Zip Code?</Headline>
      <View style={styles.viewBox1}/>
      <ZipCodeInput
        autoFocus
        error={errors && !!errors.zipCode} 
        keyboardType="number-pad"
        label="Zip Code"
        name="zipCode"
        maxLength={5}
        mode="outlined"
        textContentType="postalCode"
        validate={validate}
      />
      <HelperText name="zipCode" />
      <View style={styles.viewBox2}/>
      <Button 
        color={styles.nextButton.backgroundColor}
        mode="contained" 
        onPress={nextButtonOnPress}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(ZipCode);