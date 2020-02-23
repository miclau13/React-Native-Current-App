import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
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
    <SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleBackdropOnPress}
        style={styles.modalContainer}
      >           
      <ScrollView>
        <View style={styles.content}>
          <KeyboardAvoidingView
            style={styles.keyBoardContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.viewBox1}/>
            <Headline>Estimated After-Repair Value:</Headline>
            <View style={styles.viewBox1}/>
            <NumberInput
              autoFocus={true}
              error={+arv < 1}
              label="$"
              onChangeText={handleOnChangeText("ARV")}
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
              autoFocus={true}
              error={+asIs < 1}
              label="$"
              onChangeText={handleOnChangeText("ARV")}
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
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}
export default React.memo(ProfitSummaryEditView);