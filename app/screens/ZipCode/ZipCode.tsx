import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import { BathroomRemodelFormValues } from '../BathroomRemodel';
import MaintainFloor from '../MaintainFloor';

import HelperText from '../../components/Formik/HelperText';
import ZipCodeInput from '../../components/ZipCodeInput';

interface ZipCodeProps {
  navigation: NavigationStackScreenProps['navigation'];
}

const validate = (value: string) => {
  if (!zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  const { navigation } = props;
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { errors } = form;

  const nextButtonOnPress = React.useCallback<ButtonProps['onPress']>(() => {
    navigation.push("BathroomRemodelScreen", { questionScreen: MaintainFloor });
  }, [navigation.push]);

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