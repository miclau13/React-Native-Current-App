import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Headline, Button, ButtonProps, Text } from 'react-native-paper';

import styles from './styles';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';

interface KitchenEnhanceProps {
  backFrom: KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: KitchenRemodelFormProps['handleStepNavigation'];
}

const KitchenEnhance: React.ComponentType<KitchenEnhanceProps> = (props) => {
  const form = useFormikContext<KitchenRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonProps['onPress'] = (value) => () => {
    setFieldValue("kitchenEnhance", value);
    handleStepNavigation("kitchenRemodel");
  };

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("KitchenEnhance UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>What would you like to enhance?</Headline>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.kitchenEnhance === "Remodel/Add an entire kitchen" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("Remodel/Add an entire kitchen")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Remodel/Add an entire kitchen</Text>
      </Button>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.kitchenEnhance === "Expand kitchen" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("Expand kitchen")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Expand kitchen</Text>
      </Button>
      <View style={styles.viewBox1}/>
      <Button
        icon={values.kitchenEnhance === "Another type of alteration" ? "check-circle" : "radio-button-unchecked"}
        mode="outlined"
        onPress={handleOnPress("Another type of alteration")}
        contentStyle={styles.buttonContainer}
      >
        <Text>Another type of alteration</Text>
      </Button>
      <View style={styles.viewBox2}/>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(KitchenEnhance);