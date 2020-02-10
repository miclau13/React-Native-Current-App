import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button, Headline, Title } from 'react-native-paper';

import styles from './styles';

import { VacantPropertyViewProps } from '../VacantProperty';

const VacantPropertyView: React.ComponentType<VacantPropertyViewProps> = (props) => {
  const { buttons, handleButtonOnPress, handleOnPress, vacantPropertyIndex } = props;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>Is the property vacant now?</Headline>
        <View style={styles.viewBox1}/>
        <Title style={styles.title}>Vacant?</Title>
        <ButtonGroup
          buttons={buttons}
          onPress={handleOnPress}
          selectedButtonStyle={styles.buttonSelectedContainer}
          selectedIndex={vacantPropertyIndex}
        />
        <View style={styles.viewBox1}/>
        <Button
          mode="contained" 
          onPress={handleButtonOnPress}
          style={styles.buttonContainer}
        >
          Proceed
        </Button>
        <View style={styles.viewBox3}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default React.memo(VacantPropertyView);