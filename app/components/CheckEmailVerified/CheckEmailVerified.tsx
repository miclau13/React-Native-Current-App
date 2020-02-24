import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { Button, ButtonProps, Headline } from 'react-native-paper';

import styles from './styles';
import { LoadingComponent } from '../../screens/InitialLoading';

export interface CheckEmailVerifiedProps {
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonRefreshOnPress: ButtonProps['onPress'];
  handleButtonVerifyOnPress: ButtonProps['onPress'];
  loading: boolean;
  modalVisible: ModalProps['isVisible'];
  verificationPending: boolean;
}

const CheckEmailVerified: React.ComponentType<CheckEmailVerifiedProps> = (props) => {
  const { 
    handleBackdropOnPress,
    handleButtonRefreshOnPress,
    handleButtonVerifyOnPress,
    loading,
    modalVisible,
    verificationPending,
  } = props;

  const VerificationChecking = () => (
    <>
      <Headline>To continue, please verify your email</Headline>
        <View style={styles.viewBox1} />
        <Button 
          mode="contained" 
          onPress={handleButtonVerifyOnPress}
          style={styles.modalButton}
        >
          {"Verify"}
        </Button>
    </>
  );

  const VerificationPending = () => (
    <>
      <Headline>{'A verification email has been sent to you mail box\nPlease check you mail box.'} </Headline>
        <View style={styles.viewBox1} />
        <Button 
          mode="contained" 
          onPress={handleButtonVerifyOnPress}
          style={styles.modalButton}
        >
          {"Re-send"}
        </Button>
        <View style={styles.viewBox1} />
        <Button 
          mode="contained" 
          onPress={handleButtonRefreshOnPress}
          style={styles.modalButton}
        >
          {"Refresh"}
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
          verificationPending ?
            <VerificationPending /> :
            <VerificationChecking />
        }
        <View style={styles.viewBox1} />
      </View>
      </Modal>
    </SafeAreaView>
  );
}
export default React.memo(CheckEmailVerified);