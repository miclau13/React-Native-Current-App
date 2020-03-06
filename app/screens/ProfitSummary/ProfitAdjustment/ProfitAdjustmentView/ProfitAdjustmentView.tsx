import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button, Headline, HelperText } from 'react-native-paper';

import styles from './styles';
import { ProfitAdjustmentViewProps } from '../ProfitAdjustment';

import NumberInput from '../../../../components/NumberInput';

const ProfitAdjustmentView: React.ComponentType<ProfitAdjustmentViewProps> = (props) => {
  const { 
    _arv, 
    _asIs, 
    _vacant, 
    buttons, 
    handleBackdropOnPress,
    handleOnChangeText, 
    handleOnPress, 
    handleVacantOnPress,
    modalVisible,
  } = props; 

  return (
    <SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleBackdropOnPress}
        style={styles.modalContainer}
      >           
      {/* <ScrollView> */}
        {/* <View style={styles.content}> */}
          <KeyboardAvoidingView
            style={{ ...styles.keyBoardContainer, ...styles.content}}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.viewBox1}/>
            <Headline>Estimated After-Repair Value:</Headline>
            <View style={styles.viewBox1}/>
            <NumberInput
              autoFocus={true}
              error={+_arv < 1}
              label="$"
              onChangeText={handleOnChangeText("ARV")}
              value={_arv}
            />
            <HelperText 
              type="error"
              visible={+_arv < 0}
            >
              {"This field must be not be negative"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Estimated As-Is Value:</Headline>
            <View style={styles.viewBox1}/>
            <NumberInput
              autoFocus={true}
              error={+_asIs < 1}
              label="$"
              onChangeText={handleOnChangeText("ARV")}
              value={_asIs}
            />
            <HelperText 
              type="error"
              visible={+_asIs < 0}
            >
              {"This field must be not be negative"}
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
            <View style={styles.viewBox1}/>
            <Button 
              mode="contained" 
              onPress={handleOnPress}
              style={styles.modalButton}
            >
              Confirm
            </Button>
            </KeyboardAvoidingView>
          {/* </View> */}
        {/* </ScrollView> */}
      </Modal>
    </SafeAreaView>
  );
}
export default React.memo(ProfitAdjustmentView);