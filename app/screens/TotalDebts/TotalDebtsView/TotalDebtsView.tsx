import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline, HelperText, TextInput, TextInputProps } from 'react-native-paper';

import styles from './styles';

interface TotalDebtsViewProps {
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOnPress: ButtonProps['onPress'];
  totalDebts: string;
};

const TotalDebtsView: React.ComponentType<TotalDebtsViewProps> = (props) => {
  const { handleOnChangeText, handleOnPress, totalDebts } = props;

  React.useEffect(() => {
    return () => {console.log("TotalDebtsView UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>Total Debts:</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          error={totalDebts.length < 1 || +totalDebts < 0}
          keyboardType="number-pad"
          label="$"
          mode="outlined"
          onChangeText={handleOnChangeText}
          value={totalDebts}
          textContentType="none"
        />
        <HelperText 
          type="error"
          visible={totalDebts.length < 1}
        >
          {"This field is required"}
        </HelperText>
        <HelperText 
          type="error"
          visible={+totalDebts < 0}
        >
          {"This field must be not be negative"}
        </HelperText>
        <View style={styles.viewBox1}/>
        <Button 
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
export default React.memo(TotalDebtsView);