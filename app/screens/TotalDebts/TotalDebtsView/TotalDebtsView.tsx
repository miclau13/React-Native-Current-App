import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';

import { TotalDebtsViewProps } from '../TotalDebts';
import NumberInput from '../../../components/NumberInput';

const TotalDebtsView: React.ComponentType<TotalDebtsViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, totalDebts } = props;

  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.viewBox1}/>
          <Headline>Total Debts:</Headline>
          <View style={styles.viewBox1}/>
          <NumberInput
            autoFocus
            error={+totalDebts < 0}
            label="$"
            onChangeText={handleOnChangeText}
            value={totalDebts}
          />
          <HelperText 
            type="error"
            visible={+totalDebts < 0}
          >
            {"This field must be not be negative"}
          </HelperText>
          <View style={styles.viewBox1}/>
          <Button 
            disabled={+totalDebts < 0}
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
export default React.memo(TotalDebtsView);