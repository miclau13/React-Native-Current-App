import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import AutocompleteOption from './AutocompleteOption';
import styles from './styles';

class AutocompleteView extends PureComponent {
  render() {
    const {
      isValidAddress,
      onBlur,
      onChangeText,
      onOptionPress,
      options,
      optionsListHeight,
      value,
    } = this.props;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyBoardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.viewBox1}/>
          <Headline>What's the address of your property?</Headline>
          <View style={styles.viewBox1}/>
          <TextInput
            autoFocus
            // error={errors && !!errors.address} 
            keyboardType="default"
            label="Address"
            // name="address"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            textContentType="fullStreetAddress"
            // validate={validate}
          />
          <View style={{ height: !isValidAddress ? optionsListHeight : 0 }}>
            <FlatList
              data={options}
              keyboardShouldPersistTaps="always"
              renderItem={({ item }) => (
                <AutocompleteOption
                  onOptionPress={onOptionPress}
                  option={item}
                />
              )}
              style={{ flex: 1 }}
            />
          </View>
          <View style={styles.viewBox2}/>
          { isValidAddress ? 
              <Button 
                mode="contained" 
                onPress={()=>{}}
                style={styles.nextButton}
              >
                Next
              </Button>
            : null
          }
          <View style={styles.viewBox3}/>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

AutocompleteView.propTypes = {
  isValidAddress: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onOptionPress: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
  })).isRequired,
  optionsListHeight: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default AutocompleteView;