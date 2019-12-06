import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import AutocompleteOption from './AutocompleteOption';
import styles from './styles';

class AutocompleteView extends PureComponent {
  render() {
    const {
      handleOnPress,
      isValidAddress,
      onChangeText,
      onOptionPress,
      options,
      optionsListHeight,
      value,
    } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={styles.keyBoardContainer}
        >
          <View style={styles.viewBox1}/>
          <Headline>What's the address of your property?</Headline>
          <View style={styles.viewBox1}/>
          <TextInput
            autoFocus
            // error={errors && !!errors.address} 
            keyboardType="default"
            label="Address"
            mode="outlined"
            onChangeText={onChangeText}
            value={value}
            textContentType="fullStreetAddress"
          />
          <View style={{ height: !isValidAddress ? optionsListHeight : 0 }}>
            <FlatList
              data={options}
              keyboardShouldPersistTaps="handled"
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
                onPress={handleOnPress}
                style={styles.nextButton}
              >
                Next
              </Button>
            : null
          }
          <View style={styles.viewBox3}/>
        </View>
      </View>
    );
  }
}

AutocompleteView.propTypes = {
  isValidAddress: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onOptionPress: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
  })).isRequired,
  optionsListHeight: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default AutocompleteView;