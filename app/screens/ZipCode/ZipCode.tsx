import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import zipCodeList from './zipCodeList.json';
import BathroomRemodel from '../BathroomRemodel';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';
import MaintainFloor from '../MaintainFloor';

import HelperText from '../../components/Formik/HelperText';
import ZipCodeInput from '../../components/ZipCodeInput';

interface ZipCodeProps {
  choice?: string;
  navigation: NavigationStackScreenProps['navigation'];
}

const validate = (value: string) => {
  if (!zipCodeList.includes(value)) return 'Invalid Zip Code';
};

const ZipCode: React.ComponentType<ZipCodeProps> = (props) => {
  console.log("hi Zipcode");
  const { choice, navigation } = props;
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { errors, setFieldValue, submitForm, values } = form;
  // console.log({errors})
  const handleOnPress: ButtonProps['onPress'] = () => {
    // console.log("errors", errors)
    // console.log("Zipcode on press values ", values)
    if(!!errors.zipCode) {
      return;
    }
    submitForm();
    // setFieldValue("zipCode", values.zipCode);
    // switch (choice){
    //   case "BathroomRemodel": 
    //     navigation.push("BathroomRemodelFormScreen", { nextQuestionScreen: "maintainFloor" });
    //     break;
    //   case "KitchenRemodel": 
    //     navigation.push("BathroomRemodelFormScreen", { questionScreen: MaintainFloor });
    //     break;
    // }
  };

  React.useEffect( () => {
    console.log("ZipCode Mount");
    return () => {console.log("ZipCode UnMount")}
  }, []);

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
export default React.memo(ZipCode);