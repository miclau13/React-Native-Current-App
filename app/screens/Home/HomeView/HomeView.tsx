import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';

import styles from './styles';
import { HomeProps } from '../Home';

interface HomeViewProps extends HomeProps {};

const HomeView: React.ComponentType<HomeViewProps> = (props) => {
  const { handleOnFocus } = props;  

  React.useEffect(() => {
    // console.log("HomeView Mount")
    return () => {
      // console.log("HomeView UnMount")
    }
  }, []);
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.keyBoardContainer}>
          <View style={styles.viewBox1}/>
          <Headline>What's the address of your property?</Headline>
          <View style={styles.viewBox1}/>
          <TextInput
            keyboardType="default"
            label="Address"
            mode="outlined"
            onFocus={handleOnFocus}
            textContentType="fullStreetAddress"
          />
          <View style={styles.viewBox3}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default React.memo(HomeView);