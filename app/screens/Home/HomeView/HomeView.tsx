import React from 'react';
import { View } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';

import { HomeViewProps } from '../Home';
import styles from './styles';

const HomeView: React.ComponentType<HomeViewProps> = (props) => {
  const { handleOnFocus } = props;
  
  return (
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
  );
}
export default React.memo(HomeView);