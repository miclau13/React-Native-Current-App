import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { ArvEstimateViewProps } from '../ArvEstimate';

const ArvEstimateView: React.ComponentType<ArvEstimateViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, arvEstimate } = props;

  React.useEffect(() => {
    return () => {console.log("ArvEstimateView UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>Estimate ARV:</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          error={arvEstimate.length < 1 || +arvEstimate < 0}
          keyboardType="number-pad"
          label="$"
          mode="outlined"
          onChangeText={handleOnChangeText}
          value={arvEstimate}
          textContentType="none"
          autoFocus
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
    </View>
  );
}
export default React.memo(ArvEstimateView);