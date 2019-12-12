import { gql } from 'apollo-boost';
import React from 'react';
import { Dimensions, Keyboard, StatusBar, Platform, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import AutocompleteView from './AutocompleteView';
import styles from './styles';

const NAVIGATION_HEIGHT_LANDSCAPE = 32;
const IOS_NAVIGATION_HEIGHT_PORTRAIT = 64;
const ANDROID_NAVIGATION_HEIGHT = 81;
const IOS_STATUS_BAR_HEIGHT = 20;
const TEXT_INPUT_HEIGHT = 80;

const IBUYER_AUTOCOMPLETE = gql`
  query IbuyerAutoComplete($query: IBuyerProjectsAutoCompleteQuery!) {
    iBuyerProjectsAutoComplete(query: $query) {
      value
    }
  }
`;

type Params = {
  returnRoute: string;
  value: string;
};

type ScreenProps = {};

const Autocomplete: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { refetch } = useQuery(IBUYER_AUTOCOMPLETE, {
    variables: { query: { query: " " } }
  });

  const [options, setOptions] = React.useState([]);
  const [optionsListHeight, setOptionsListHeight] = React.useState(200);
  const [value, setValue] = React.useState('');
  const [isValidAddress, setIsValidAddress] = React.useState(false);

  let keyboardDidShowSub = null;
  let keyboardDidHideSub = null;
  let keyboardHeight = 0;

  const handleChangeText = async (value) => {
    setValue(value);
    setIsValidAddress(false);
    await updateOptions(value);
  };

  const handleKeyboardDidHide = () => {
    keyboardHeight = 0;
    updateOptionsListHeight();
  };

  const handleKeyboardDidShow = ({ endCoordinates: { height } }) => {
    keyboardHeight = height;
    updateOptionsListHeight();
  };

  const handleLayout = () => {
    updateOptionsListHeight();
  };

  const handleOptionPress = (value) => {
    setValue(value);
    setIsValidAddress(true);
  };

  const handleOnPress = () => {
    const { navigation } = props;
    navigation.navigate("PropertyInfoScreen", { address: value });
  };

  const updateOptions = async (value) => {
    if (value.length >= 1) {
      const result = await refetch({ query: { query: value } });
      let optionsList = [];
      if (result && result.data && result.data.iBuyerProjectsAutoComplete) {
        optionsList = result.data.iBuyerProjectsAutoComplete.map(item => item.value);
      };
      const options = optionsList.map(option => ({ key: option }));
      setOptions(options);
    };
  };

  const updateOptionsListHeight = () => {
    const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
    const portrait = windowHeight > windowWidth;
    const androidStatusBarHeight = StatusBar.currentHeight;
    let optionsListHeight;
    switch (Platform.OS) {
      case 'ios':
        optionsListHeight = portrait
          ? windowHeight
            - keyboardHeight
            - IOS_STATUS_BAR_HEIGHT
            - IOS_NAVIGATION_HEIGHT_PORTRAIT
            - TEXT_INPUT_HEIGHT
          : windowHeight
            - keyboardHeight
            - NAVIGATION_HEIGHT_LANDSCAPE
            - TEXT_INPUT_HEIGHT;
        break;
      case 'android':
        optionsListHeight = windowHeight
          - keyboardHeight
          - androidStatusBarHeight
          - ANDROID_NAVIGATION_HEIGHT
          - TEXT_INPUT_HEIGHT;
        break;
      default:
    };
    setOptionsListHeight(optionsListHeight);
  };

  React.useEffect(() => {
    console.log("Autocomplete Mount");
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    return () => {
      keyboardDidHideSub.remove();
      keyboardDidShowSub.remove();
      console.log("Autocomplete UnMount")
    }
  }, []);

  return (
    <View
      onLayout={handleLayout}
      style={styles.container}
    >
      <AutocompleteView
        handleOnPress={handleOnPress}
        isValidAddress={isValidAddress}
        onChangeText={handleChangeText}
        onOptionPress={handleOptionPress}
        options={options}
        optionsListHeight={optionsListHeight}
        value={value}
      />
    </View>
  )
};

export default React.memo(Autocomplete);