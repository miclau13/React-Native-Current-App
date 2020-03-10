import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { ProfitSummaryEditViewProps } from '../ProfitSummary';

import NumberInput from '../../../components/NumberInput';

const ProfitSummaryEditView: React.ComponentType<ProfitSummaryEditViewProps> = (props) => {
  const { 
    buttonsForVacant,
    handleBackdropOnPress,
    handleButtonConfirmOnPress,
    handleButtonGroupVacantOnPress,
    handleOnChangeText,
    modalVisible,
    profitSummaryEditOnlyFields,
  } = props;

  const { 
    arv,
    asIs,
    vacant
  } = profitSummaryEditOnlyFields

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleBackdropOnPress}
      style={styles.modalContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.viewBox1}/>
            <Headline>Estimated After-Repair Value:</Headline>
            <View style={styles.viewBox1}/>
              <NumberInput
                error={+arv < 1}
                label="$"
                onChangeText={handleOnChangeText("arv")}
                value={arv}
              />
              <HelperText 
                type="error"
                visible={+arv < 0}
              >
                {"This field must be not be negative"}
              </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Estimated As-Is Value:</Headline>
            <View style={styles.viewBox1}/>
            <NumberInput
              error={+asIs < 1}
              label="$"
              onChangeText={handleOnChangeText("asIs")}
              value={asIs}
            />
            <HelperText 
              type="error"
              visible={+asIs < 0}
            >
              {"This field must be not be negative"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Vacant?</Headline>
            <View style={styles.viewBox1}/>
            <ButtonGroup
              buttons={buttonsForVacant}
              onPress={handleButtonGroupVacantOnPress}
              selectedButtonStyle={styles.buttonSelectedContainer}
              selectedIndex={vacant}
            />
            <View style={styles.viewBox1}/>
            <Button 
              mode="contained" 
              onPress={handleButtonConfirmOnPress}
              style={styles.modalButton}
            >
              Confirm
            </Button>
            <View style={styles.viewBox1}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
export default React.memo(ProfitSummaryEditView);