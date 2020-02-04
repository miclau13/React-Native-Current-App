import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Headline, TextInput } from 'react-native-paper';

import styles from './styles';
import { AutocompleteEditViewProps } from '../Autocomplete';

const AutocompleteEditView: React.ComponentType<AutocompleteEditViewProps> = (props) => {
  const {
    googleAddress,
    handleBackdropOnPress,
    handleButtonConfirmOnPress,
    handleButtonEditOnPress,
    modalVisible,
  } = props;
  return (
    <SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleBackdropOnPress}
        style={styles.modalContainer}
      > 
        <View style={styles.content}>
          <Headline>{"Confirm Your Address"}</Headline>
          <View style={styles.viewBox1}/>
          <TextInput
            label="Address"
            mode="outlined"
            value={googleAddress}
            textContentType="none"
            disabled={true}
            style={{ height: 100 }}
          />
          <View style={styles.viewBox1}/>
          <Button mode="contained" style={styles.modalButton} onPress={handleButtonConfirmOnPress}>
            Confirm
          </Button>
          <View style={styles.viewBox1}/>
          <Button mode="contained" style={styles.modalButton} onPress={handleButtonEditOnPress}>
            Edit
          </Button>
          <View style={styles.viewBox1}/>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AutocompleteEditView;