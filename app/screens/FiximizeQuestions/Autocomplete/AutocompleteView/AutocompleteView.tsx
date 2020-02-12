import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { Button, Headline, TextInput, HelperText } from 'react-native-paper';

import AutocompleteOption from './AutocompleteOption';
import styles from './styles';
import { AutocompleteViewProps } from '../Autocomplete';

const AutocompleteView: React.ComponentType<AutocompleteViewProps> = (props) => {
  const {
    error,
    handleLayout,
    handleOnPress,
    isValidAddress,
    handleOnChangeText,
    handleOptionPress,
    options,
    optionsListHeight,
    value,
  } = props;
  return (
    <SafeAreaView onLayout={handleLayout} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>What's the address of your property?</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          autoFocus
          keyboardType="default"
          label="Address"
          mode="outlined"
          onChangeText={handleOnChangeText}
          value={value}
          textContentType="fullStreetAddress"
          error={error}
        />
        <HelperText type="error" visible={error}>
          Address is invalid.
        </HelperText> 
        <View style={{ height: !isValidAddress && options.length > 0 ? optionsListHeight : 0 }}>
          <FlatList
            data={options}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <AutocompleteOption
                onOptionPress={handleOptionPress}
                option={item}
              />
            )}
            style={{ flex: 1 }}
          />
        </View>
        <View style={styles.viewBox1}/>
        <Button 
          mode="contained" 
          onPress={handleOnPress}
          style={styles.nextButton}
        >
          Next
        </Button>
          
        <View style={styles.viewBox3}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AutocompleteView;