import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { LoadingComponent } from '../../screens/InitialLoading';

export interface CheckEmailVerifiedProps {
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonOkOnPress: ButtonProps['onPress'];
  handleButtonVerifyOnPress: ButtonProps['onPress'];
  loading: boolean;
  modalVisible: ModalProps['isVisible'];
}

const CheckEmailVerified: React.ComponentType<CheckEmailVerifiedProps> = (props) => {
  const { 
    handleBackdropOnPress,
    handleButtonOkOnPress,
    handleButtonVerifyOnPress,
    loading,
    modalVisible,
  } = props;

  const VerificationChecking = () => (
    <>
      <Headline>Please check your email and confirm your email address before proceeding.</Headline>
        <View style={styles.viewBox1} />
        <Button 
          mode="contained" 
          onPress={handleButtonOkOnPress}
          style={styles.modalButton}
        >
          {"OK"}
        </Button>
        <View style={styles.viewBox1} />
        <Button 
          mode="contained" 
          onPress={handleButtonVerifyOnPress}
          style={styles.modalButton}
        >
          {"Resend Verification EMail"}
        </Button>
    </>
  );

  return (
    <SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleBackdropOnPress}
        style={styles.modalContainer}
      >
      <View style={styles.content}>
        <View style={styles.viewBox1} />
        {loading ? 
          <LoadingComponent /> :
          <VerificationChecking />
        }
        <View style={styles.viewBox1} />
      </View>
      </Modal>
    </SafeAreaView>
  );
}
export default React.memo(CheckEmailVerified);