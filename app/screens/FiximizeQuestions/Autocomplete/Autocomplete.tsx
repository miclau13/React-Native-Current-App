import React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, StatusBar, Platform, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Button, ButtonProps, Headline, TextInput } from 'react-native-paper';

import AutocompleteView from './AutocompleteView';
import styles from './styles';
import debounced from './utils/debounced';

const DEBOUNCE_MS = 500;
const NAVIGATION_HEIGHT_LANDSCAPE = 32;
const IOS_NAVIGATION_HEIGHT_PORTRAIT = 64;
const ANDROID_NAVIGATION_HEIGHT = 81;
const IOS_STATUS_BAR_HEIGHT = 20;
const TEXT_INPUT_HEIGHT = 80;

type Params = {
  // TODO type
  fetchOptions: any;
  returnRoute: string;
  value: string;
};

type ScreenProps = {};

const Autocomplete: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation: { getParam } } = props;
  const fetchOptions = getParam('fetchOptions', null);

  const [options, setOptions] = React.useState([]);
  const [optionsListHeight, setOptionsListHeight] = React.useState(200);
  const [value, setValue] = React.useState('');
  const [isValidAddress, setIsValidAddress] = React.useState(false);

  // let fetchOptions: (value: string) => void = null;

  let keyboardDidShowSub = null;
  let keyboardDidHideSub = null;
  let keyboardHeight = 0;

  let lastFetchOptions = null;
  let lastFetchOptionsValue = null;
  let mounted = true;
  let navigating = false;

  console.log("autocomplete fetchOptions outside", fetchOptions)

  const handleChangeText = (value) => {
    setValue(value);
    updateOptions(value);
    setIsValidAddress(false);
  };

  const handleInputBlur = () => {
    if (navigating) return;
    if (options.length !== 1) return;
    if (value !== lastFetchOptionsValue) return;
    const completedValue = options[0].key;
    console.log("handleInputBlur completedValue", completedValue)
    returnWithValue(completedValue);
  }

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
    updateOptions('');
    // returnWithValue(value);
  }

  const handleWillBlur = () => {
    navigating = true;
  };

  const returnWithValue = (value) => {
    const { navigation: { getParam, navigate } } = props;
    const returnRoute = getParam('returnRoute', null);
    if (returnRoute === null) throw new Error('Autocomplete navigate must have returnRoute');
    navigate(returnRoute, { value });
  };

  const updateOptionsSingular = async (value) => {
    console.log("updateOptionsSingular value", value);
    console.log("updateOptionsSingular fetchOptions", fetchOptions)
    const thisFetchOptions = fetchOptions(value); // WEIRD - NOT ABLE TO DIRECTLY SET
    console.log("updateOptionsSingular thisFetchOptions & lastFetchOptions", thisFetchOptions)
    lastFetchOptions = thisFetchOptions;
    const optionsList = await lastFetchOptions;
    console.log("updateOptionsSingular optionsList", optionsList)
    if (!mounted) return;
    console.log("updateOptionsSingular mounted", mounted)
    if (thisFetchOptions !== lastFetchOptions) return;
    const options = optionsList.map(option => ({ key: option }));
    console.log("updateOptionsSingular options", options)
    setOptions(options);
    lastFetchOptionsValue = value;
    console.log("updateOptionsSingular lastFetchOptionsValue", lastFetchOptionsValue)
  };

  const updateOptions = debounced(DEBOUNCE_MS, updateOptionsSingular);

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
    }
    setOptionsListHeight(optionsListHeight);
  }

  React.useEffect(() => {
    console.log("Autocomplete Mount");
    const { navigation: { getParam } } = props;
    const value = getParam('value', null);
    if (value === null) throw new Error('Autocomplete navigate must have value');
    const fetchOptions = getParam('fetchOptions', null);
    console.log("autocomplete useEffect fetchOptions",fetchOptions)
    if (fetchOptions === null) throw new Error('Autocomplete navigate must have fetchOptions');
    setValue(value);
    updateOptions(value);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    return () => {
      mounted = false;
      keyboardDidHideSub.remove();
      keyboardDidShowSub.remove();
      console.log("Autocomplete UnMount")
    }
  }, []);

  return (
    // <View style={styles.container}>
    //     <View style={styles.viewBox1}/>
    //     <Headline>What's the address of your property?</Headline>
    //     <View style={styles.viewBox1}/>
        <View
          onLayout={handleLayout}
          style={{ flex: 1 }}
        >
        <NavigationEvents
          onWillBlur={handleWillBlur}
        />
        <AutocompleteView
          isValidAddress={isValidAddress}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          onOptionPress={handleOptionPress}
          options={options}
          optionsListHeight={optionsListHeight}
          value={value}
        />
      </View>
    // </View>
  )
};

export default React.memo(Autocomplete);