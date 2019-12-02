import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Button, ButtonProps, Headline, TextInput } from 'react-native-paper';

import HelperText from '../../../components/Formik/HelperText';
import AddressInput from '../../../components/AddressInput';

import styles from './styles';

type Params = {};

type ScreenProps = {};

const AutoCompleteAddressForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {

  const [address, setAddress] = React.useState(null);

  const handleOnChangeText = React.useCallback(value => {
    console.log("handleOnChangeText", value);
    setAddress(value);
    // navigation.navigate("PricingScreen");
  }, [address]);

  const handleOnPress = React.useCallback(() => {
    console.log("AutoCompleteAddressForm onsubmit vaues", address);
    navigation.navigate("PropertyInfoScreen", { address });
  }, [address]);

  const { navigation } = props;

  React.useEffect(() => {
    console.log("AutoCompleteAddressForm Mount");
    return () => {console.log("AutoCompleteAddressForm UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>What's the address of your property?</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          autoFocus
          // error={errors && !!errors.address} 
          keyboardType="default"
          label="Address"
          // name="address"
          mode="outlined"
          onChangeText={handleOnChangeText}
          textContentType="fullStreetAddress"
          // validate={validate}
        />
        {/* <HelperText name="address"/> */}
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
    </View>
  )
};

export default React.memo(AutoCompleteAddressForm);