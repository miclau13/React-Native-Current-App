import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { AsIsEstimateViewProps } from '../AsIsEstimate';

const AsIsEstimateView: React.ComponentType<AsIsEstimateViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, asIsEstimate } = props;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>As-Is Estimate:</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          error={asIsEstimate.length < 1 || +asIsEstimate < 0}
          keyboardType="number-pad"
          label="$"
          mode="outlined"
          onChangeText={handleOnChangeText}
          value={asIsEstimate}
          textContentType="none"
          autoFocus
        />
        <HelperText 
          type="error"
          visible={asIsEstimate.length < 1}
        >
          {"This field is required"}
        </HelperText>
        <HelperText 
          type="error"
          visible={+asIsEstimate < 0}
        >
          {"This field must be not be negative"}
        </HelperText>
        <View style={styles.viewBox1}/>
        <Button 
          disabled={asIsEstimate.length < 1}
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
export default React.memo(AsIsEstimateView);