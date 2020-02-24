import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { Viewer } from '../../generated/Viewer';

export interface CheckEmailVerifiedProps {
  // emailVerified: Viewer['viewer']['emailVerified'];
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonOnPress: ButtonProps['onPress'];
  modalVisible: ModalProps['isVisible'];
}

const CheckEmailVerified: React.ComponentType<CheckEmailVerifiedProps> = (props) => {
  const { 
    handleBackdropOnPress,
    handleButtonOnPress,
    modalVisible,
  } = props;

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
            <Headline>To proceed, please verify your email</Headline>
            <View style={styles.viewBox1}/>
            <Button 
              mode="contained" 
              onPress={handleButtonOnPress}
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
export default React.memo(CheckEmailVerified);