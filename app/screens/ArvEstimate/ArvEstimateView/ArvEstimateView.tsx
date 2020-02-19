import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { ArvEstimateViewProps } from '../ArvEstimate';

import NumberInput from '../../../components/NumberInput';

const ArvEstimateView: React.ComponentType<ArvEstimateViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, arvEstimate } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>Estimated After-Repair Value:</Headline>
        <View style={styles.viewBox1}/>
        <NumberInput
          error={+arvEstimate < 0}
          label="$"
          onChangeText={handleOnChangeText}
          value={arvEstimate}
        />
        <HelperText 
          type="error"
          visible={+arvEstimate < 0}
        >
          {"This field must be not be negative"}
        </HelperText>
        <View style={styles.viewBox1}/>
        <Button 
          disabled={+arvEstimate < 0}
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