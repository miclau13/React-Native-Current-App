import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { ArvEstimateViewProps } from '../ArvEstimate';

import NumberFormat from 'react-number-format';

const ArvEstimateView: React.ComponentType<ArvEstimateViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, arvEstimate } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>Estimate ARV:</Headline>
        <View style={styles.viewBox1}/>
        <NumberFormat 
          displayType={'text'}
          renderText={value => {
            console.log("PhoneNumberInput value", value)
            return (
              <TextInput
                autoFocus
                error={arvEstimate.length < 1 || +arvEstimate < 0}
                keyboardType="number-pad"
                label="$"
                mode="outlined"
                onChangeText={handleOnChangeText}
                value={value}
                textContentType="none"
              />
            )
          }}
          value={arvEstimate}
        />

        <HelperText 
          type="error"
          visible={arvEstimate.length < 1}
        >
          {"This field is required"}
        </HelperText>
        <HelperText 
          type="error"
          visible={+arvEstimate < 0}
        >
          {"This field must be not be negative"}
        </HelperText>
        <View style={styles.viewBox1}/>
        <Button 
          disabled={arvEstimate.length < 1}
          mode="contained" 
          onPress={handleOnPress}
          style={styles.nextButton}
        >
          {`Proceed`}
        </Button>
        <View style={styles.viewBox3}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(ArvEstimateView);