import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import styles from './styles';
import { AutocompleteOptionProps } from '../../Autocomplete';

const AutocompleteOption: React.ComponentType<AutocompleteOptionProps> = (props) => {

  const { onOptionPress, option: { key } } = props;

  const handleOnPress = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    onOptionPress(key);
  }, [key])

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Text style={styles.autocompleteOptionText}>{key}</Text>
    </TouchableOpacity>
  )
};

export default AutocompleteOption;