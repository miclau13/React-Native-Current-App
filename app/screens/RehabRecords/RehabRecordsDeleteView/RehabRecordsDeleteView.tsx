import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Headline } from 'react-native-paper';

import styles from './styles';
import { RehabRecordsDeleteProps } from '../RehabRecords';

interface RehabRecordsDeleteViewProps extends RehabRecordsDeleteProps {};

const RehabRecordsDeleteView: React.ComponentType<RehabRecordsDeleteViewProps> = (props) => {
  const { handleCancelOnPress, handleDeleteOnPress, lengthOfSelectedRehabRecords, openConfirmModal } = props;  

  React.useEffect(() => {
    console.log("RehabRecordsDeleteView Mount")
    return () => {console.log("RehabRecordsDeleteView UnMount")}
  }, []);

  return (
    <SafeAreaView>
      <Modal
        isVisible={openConfirmModal}
        onBackdropPress={handleCancelOnPress}
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