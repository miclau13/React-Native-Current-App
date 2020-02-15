import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { PropertyInfoAdjustmentViewProps } from '../PropertyInfoAdjustment';

const PropertyInfoAdjustment: React.ComponentType<PropertyInfoAdjustmentViewProps> = (props) => {

  const { 
    handleOnChangeText,
    handleButtonSaveOnPress,
    handleTextInputOnBlur,
    _beds,
    _sqft,
    _fullBaths,
    _threeQuarterBaths,
    _halfBaths,
  } = props;

  return (
    <SafeAreaView>
      <Modal
        isVisible
        style={styles.modalContainer}
      >           
      <ScrollView>
        <View style={styles.content}>
          <KeyboardAvoidingView
            style={styles.keyBoardContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.viewBox1}/>
            <Headline>No. Of Beds:</Headline>
            <View style={styles.viewBox1}/>
            <TextInput
              error={+_beds < 1}
              keyboardType="number-pad"
              mode="outlined"
              onBlur={handleTextInputOnBlur}
              onChangeText={handleOnChangeText("_beds")}
              value={_beds}
              textContentType="none"
            />
            <HelperText type="error" visible={+_beds < 1}>
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Sq. ft.:</Headline>
            <TextInput
              error={_sqft.length < 1}
              keyboardType="number-pad"
              mode="outlined"
              onBlur={handleTextInputOnBlur}
              onChangeText={handleOnChangeText("_sqft")}
              value={_sqft}
              textContentType="none"
            />
            <HelperText type="error" visible={+_sqft < 1}>
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Full Baths:</Headline>
            <TextInput
              error={_fullBaths.length < 1}
              keyboardType="number-pad"
              mode="outlined"
              onBlur={handleTextInputOnBlur}
              onChangeText={handleOnChangeText("_fullBaths")}
              value={_fullBaths}
              textContentType="none"                
            />
            <HelperText type="error" visible={+_fullBaths < 1}>
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Three Quarter Baths:</Headline>
            <TextInput
              error={!!_threeQuarterBaths && _threeQuarterBaths.length < 0}
              keyboardType="number-pad"
              mode="outlined"
              onBlur={handleTextInputOnBlur}
              onChangeText={handleOnChangeText("_threeQuarterBaths")}
              value={_threeQuarterBaths}
              textContentType="none"
            />
            <HelperText type="error" visible={+_threeQuarterBaths < 0}>
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Half Baths:</Headline>
            <TextInput
              error={!!_halfBaths && _halfBaths.length < 0}
              keyboardType="number-pad"
              mode="outlined"
              onBlur={handleTextInputOnBlur}
              onChangeText={handleOnChangeText("_halfBaths")}
              value={_halfBaths}
              textContentType="none"
            />
            <HelperText type="error" visible={+_halfBaths < 0}>
              {"This field is required"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Button 
              mode="contained" 
              onPress={handleButtonSaveOnPress}
              style={styles.modalButton}
            >
              {"Save"}
            </Button>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );

}
export default React.memo(PropertyInfoAdjustment);