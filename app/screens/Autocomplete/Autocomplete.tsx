import { gql } from 'apollo-boost';
import React from 'react';
import { Dimensions, Keyboard, StatusBar, Platform } from 'react-native';
import { ModalProps } from 'react-native-modal';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { ButtonProps, TextInputProps } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/react-hooks';

import AutocompleteView from './AutocompleteView';
import AutocompleteEditView from './AutocompleteEditView';
import { ValidateAddress,ValidateAddressVariables } from '../../generated/ValidateAddress';

export enum FiximizeFlow {
  AutoCompleteAddress,
  SelfInputAddress
}

type Params = {
  returnRoute: string;
  value: string;
};

type ScreenProps = {};

export interface AutocompleteViewProps {
  error: boolean;
  handleLayout(): void;
  handleOnPress: ButtonProps['onPress'];
  isValidAddress: boolean;
  handleOnChangeText: TextInputProps['onChangeText'];
  handleOptionPress(value: string): void;
  options: { key: string; }[];
  optionsListHeight: number;
  value: string;
};
export interface AutocompleteEditViewProps {
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonConfirmOnPress: ButtonProps['onPress'];
  handleButtonEditOnPress: ButtonProps['onPress'];
  googleAddress: string;
  modalVisible: boolean;
};

export interface AutocompleteOptionProps {
  onOptionPress(value: string): void;
  option: { key: string; };
};

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

const VALIDATE_ADDRESS_BY_GOOGLE = gql`
  mutation ValidateAddress($input: String!) {
    validateAddress(input: $input) {
      isValidAddress
      fullAddress
      streetNumber
      streetName
      city
      county
      region
      country
      postalCode
    }
  }
`;

const Autocomplete: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { refetch } = useQuery(IBUYER_AUTOCOMPLETE, {
    variables: { query: { query: " " } }
  });

  const [validateAddressByGoogle] = useMutation<ValidateAddress, ValidateAddressVariables>(VALIDATE_ADDRESS_BY_GOOGLE);

  const [options, setOptions] = React.useState([]);
  const [optionsListHeight, setOptionsListHeight] = React.useState(200);
  const [value, setValue] = React.useState('');
  const [googleAddress, setGoogleAddress] = React.useState('');
  const [isValidTrudeedAddress, setIsValidTrudeedAddress] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postalCode, setPostalCode] = React.useState('');

  let keyboardDidShowSub = null;
  let keyboardDidHideSub = null;
  let keyboardHeight = 0;

  const handleKeyboardDidHide = () => {
    keyboardHeight = 0;
    updateOptionsListHeight();
  };
  const handleKeyboardDidShow = ({ endCoordinates: { height } }) => {
    keyboardHeight = height;
    updateOptionsListHeight();
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

  // For AutocompleteEditView
  const handleBackdropOnPress: AutocompleteEditViewProps['handleBackdropOnPress'] = () => {
    setModalVisible(false);
  };
  const handleButtonConfirmOnPress: AutocompleteEditViewProps['handleButtonConfirmOnPress'] = () => {
    setModalVisible(false);
    setValue(googleAddress);
    navigation.navigate("ArvEstimateScreen", { postalCode, address: googleAddress, flow: FiximizeFlow.SelfInputAddress })
  };
  const handleButtonEditOnPress: AutocompleteEditViewProps['handleButtonEditOnPress'] = () => {
    setModalVisible(false);
  };

  // For AutocompleteView
  const handleChangeText: AutocompleteViewProps['handleOnChangeText'] = async (value) => {
    setValue(value);
    setIsValidTrudeedAddress(false);
    setError(false);
    await updateOptions(value);
  };
  const handleLayout: AutocompleteViewProps['handleLayout'] = () => {
    updateOptionsListHeight();
  };
  const handleOptionPress: AutocompleteViewProps['handleOptionPress'] = (value) => {
    setValue(value);
    setIsValidTrudeedAddress(true);
    Keyboard.dismiss();
  };
  /* arv should be filled to avoid generated arv accurancy issue */
  const handleOnPress: AutocompleteViewProps['handleOnPress'] = async () => {
    setModalVisible(false);
    if (isValidTrudeedAddress) {
      navigation.navigate("ArvEstimateScreen", { address: value, flow: FiximizeFlow.AutoCompleteAddress  });
    } else {
      const result = await validateAddressByGoogle({ variables: { input: value } });
      if (result?.data?.validateAddress?.isValidAddress) {
        setGoogleAddress(result?.data?.validateAddress?.fullAddress)
        setPostalCode(result?.data?.validateAddress?.postalCode)
        setModalVisible(true);
        Keyboard.dismiss();
      } else {
        setError(true);
        Keyboard.dismiss();
        return;
      }
    }
  };

  const updateOptions = async (value: string) => {
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

  React.useEffect(() => {
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    return () => {
      keyboardDidHideSub.remove();
      keyboardDidShowSub.remove();
    }
  }, []);

  return (
    <>
      <AutocompleteEditView 
        handleBackdropOnPress={handleBackdropOnPress}
        handleButtonConfirmOnPress={handleButtonConfirmOnPress}
        handleButtonEditOnPress={handleButtonEditOnPress}
        googleAddress={googleAddress}
        modalVisible={modalVisible}
      />
      <AutocompleteView
        handleLayout={handleLayout}
        handleOnPress={handleOnPress}
        isValidAddress={isValidTrudeedAddress}
        handleOnChangeText={handleChangeText}
        handleOptionPress={handleOptionPress}
        options={options}
        optionsListHeight={optionsListHeight}
        value={value}
        error={error}
      />
    </>
  )
};

export default React.memo(Autocomplete);