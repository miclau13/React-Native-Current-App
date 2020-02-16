import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';

import styles from './styles';
import { PropertyInfoEditViewProps } from '../PropertyInfo';
import NumberInput from '../../../components/NumberInput';

const PropertyInfoEditView: React.ComponentType<PropertyInfoEditViewProps> = (props) => {
  const { 
    fields,
    handleBackdropOnPress,
    handleButtonSaveOnPress,
    handleOnChangeText,
    modalVisible,
  } = props;

  const { 
    beds,
    sqft,
    fullBaths,
    threeQuarterBaths,
    halfBaths
  } = fields

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
            <Headline>No. Of Beds:</Headline>
            <View style={styles.viewBox1}/>
            <NumberInput
              autoFocus={true}
              error={+beds < 1}
              onChangeText={handleOnChangeText("beds")}
              value={beds}
            />
            <HelperText type="error" visible={+beds < 1}>
              {"This field must be positive"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Full Baths:</Headline>
            <NumberInput
              autoFocus={false}
              error={+fullBaths < 1}
              onChangeText={handleOnChangeText("fullBaths")}
              value={fullBaths}
            />
            <HelperText type="error" visible={+fullBaths < 1}>
              {"This field must be positive"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Half Baths:</Headline>
            <NumberInput
              autoFocus={false}
              error={+halfBaths < 0}
              onChangeText={handleOnChangeText("halfBaths")}
              value={halfBaths}
            />
            <HelperText type="error" visible={+halfBaths < 0}>
              {"This field must be not be negative"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>No. Of Three Quarter Baths:</Headline>
            <NumberInput
              autoFocus={false}
              error={+threeQuarterBaths < 0}
              onChangeText={handleOnChangeText("threeQuarterBaths")}
              value={threeQuarterBaths}
            />
            <HelperText type="error" visible={+threeQuarterBaths < 0}>
              {"This field must be not be negative"}
            </HelperText>
            <View style={styles.viewBox1}/>
            <Headline>Sq. ft.:</Headline>
            <NumberInput
              autoFocus={false}
              error={+sqft < 1}
              onChangeText={handleOnChangeText("sqft")}
              value={sqft}
            />
            <HelperText type="error" visible={+sqft < 1}>
              {"This field must be positive"}
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
export default React.memo(PropertyInfoEditView);