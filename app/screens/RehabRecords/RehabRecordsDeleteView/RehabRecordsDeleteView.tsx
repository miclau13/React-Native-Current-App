import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Headline } from 'react-native-paper';

import styles from './styles';
import { RehabRecordsDeleteViewProps } from '../RehabRecords';

const RehabRecordsDeleteView: React.ComponentType<RehabRecordsDeleteViewProps> = (props) => {
  const { 
    handleBackdropOnPress, 
    handleCancelOnPress, 
    handleDeleteOnPress, 
    lengthOfSelectedRehabRecords,
    openConfirmModal
  } = props;  

  return (
    <SafeAreaView>
      <Modal
        isVisible={openConfirmModal}
        onBackdropPress={handleBackdropOnPress}
        style={styles.modalContainer}
      >
        <View style={styles.content}>
          <Headline>{"Are you sure to delete the selected record(s)?"}</Headline>
          <View style={styles.viewBox1}/>
          <Button 
            mode="contained" 
            onPress={handleDeleteOnPress}
            style={styles.nextButton}
          >
            {`Delete ${lengthOfSelectedRehabRecords} Records`}
          </Button>
          <View style={styles.viewBox1}/>
          <Button 
            mode="contained" 
            onPress={handleCancelOnPress}
            style={styles.nextButton}
          >
            Cancel
          </Button>
          <View style={styles.viewBox1}/>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
export default React.memo(RehabRecordsDeleteView);