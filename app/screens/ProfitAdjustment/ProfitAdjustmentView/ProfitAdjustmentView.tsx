import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { ProfitAdjustmentInnerProps } from '../ProfitAdjustment';

interface ProfitAdjustmentViewProps extends ProfitAdjustmentInnerProps {};

const ProfitAdjustmentView: React.ComponentType<ProfitAdjustmentViewProps> = (props) => {
  const { _arv, _asIs, _vacant, buttons, handleOnChangeText, handleOnPress, handleVacantOnPress } = props; 

  React.useEffect(() => {
    console.log("ProfitAdjustmentView Mount");
    return () => {console.log("ProfitAdjustmentView UnMount")}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.keyBoardContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.viewBox1}/>
            <Headline>ARV Estimate:</Headline>
            <View style={styles.viewBox1}/>
            <TextInput
              error={_arv.length < 1}
              keyboardType="number-pad"
              label="$"
              mode="outlined"
              onChangeText={handleOnChangeText("ARV")}
              value={_arv}
              textContentType="none"
            />
            <HelperText 
              type="error"
              visible={_arv.length < 1}
            >
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>As-Is :</Headline>
            <View style={styles.viewBox1}/>
            <TextInput
              error={_asIs.length < 1}
              keyboardType="number-pad"
              label="$"
              mode="outlined"
              onChangeText={handleOnChangeText("ASIS")}
              value={_asIs}
              textContentType="none"
            />
            <HelperText 
              type="error"
              visible={_asIs.length < 1}
            >
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Vacant?</Headline>
            <View style={styles.viewBox1}/>
            <ButtonGroup
              buttons={buttons}
              onPress={handleVacantOnPress}
              selectedButtonStyle={styles.buttonSelectedContainer}
              selectedIndex={_vacant}
            />
            <View style={styles.viewBox2}/>
            <Button 
              mode="contained" 
              onPress={handleOnPress}
              style={styles.nextButton}
            >
              Confirm
            </Button>
            <View style={styles.viewBox3}/>
          </KeyboardAvoidingView>
        </View>
    </ScrollView>
  </SafeAreaView>
  );
}
export default React.memo(ProfitAdjustmentView);