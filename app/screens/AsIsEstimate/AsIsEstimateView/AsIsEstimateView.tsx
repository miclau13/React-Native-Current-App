import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { AsIsEstimateViewProps } from '../AsIsEstimate';
import NumberInput from '../../../components/NumberInput';

const AsIsEstimateView: React.ComponentType<AsIsEstimateViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, asIsEstimate } = props;

  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.viewBox1}/>
          <Headline>Estimated As-Is Value:</Headline>
          <View style={styles.viewBox1}/>
          <NumberInput
            autoFocus
            error={+asIsEstimate < 0}
            label="$"
            onChangeText={handleOnChangeText}
            value={asIsEstimate}
          />
          <HelperText 
            type="error"
            visible={+asIsEstimate < 0}
          >
            {"This field must be not be negative"}
          </HelperText>
          <View style={styles.viewBox1}/>
          <Button 
            disabled={+asIsEstimate < 0}
            mode="contained" 
            onPress={handleOnPress}
            style={styles.nextButton}
          >
            {`Proceed`}
          </Button>
          <View style={styles.viewBox3}/>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(AsIsEstimateView);