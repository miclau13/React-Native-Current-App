import { gql } from 'apollo-boost';
import React from 'react';
import { Dimensions, Keyboard, StatusBar, Platform, View, Modal } from 'react-native';
import { Button } from "react-native-paper";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Headline, TextInput } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/react-hooks';

import AutocompleteView from './AutocompleteView';
import styles from './styles';

export enum FiximizeFlow {
  AutoCompleteAddress,
  SelfInputAddress
}

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
    isValidateAddress
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

type Params = {
  returnRoute: string;
  value: string;
};

type ScreenProps = {};

const Autocomplete: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { refetch } = useQuery(IBUYER_AUTOCOMPLETE, {
    variables: { query: { query: " " } }
  });

  const [validateAddressByGoogle] = useMutation<any, any>(VALIDATE_ADDRESS_BY_GOOGLE);

  const [options, setOptions] = React.useState([]);
  const [optionsListHeight, setOptionsListHeight] = React.useState(200);
  const [value, setValue] = React.useState('');
  const [isValidAddress, setIsValidAddress] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postalCode, setPostalCode] = React.useState('');

  let keyboardDidShowSub = null;
  let keyboardDidHideSub = null;
  let keyboardHeight = 0;

  const handleChangeText = async (value) => {
    console.log(value)
    setValue(value);
    setIsValidAddress(false);
    setError(false);
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

  const handleOnPress = async () => {
    const { navigation } = props;
    setModalVisible(false);
    if (isValidAddress) {
      navigation.navigate("AsIsEstimateScreen", { address: value, flow: FiximizeFlow.AutoCompleteAddress  });
    } else {
      const result = await validateAddressByGoogle({ variables: { input: value } });
      console.log(result);
      if (result?.data?.validateAddress?.isValidateAddress) {
        setValue(result?.data?.validateAddress?.fullAddress)
        setPostalCode(result?.data?.validateAddress?.postalCode)
        setModalVisible(true);
      } else {
        setError(true);
        return;
      }
    }
  };

  const handleButtonConfirm = async () => {
    const { navigation } = props;
    setModalVisible(false);
    navigation.navigate("ArvEstimateScreen", { postalCode, address: value, flow: FiximizeFlow.SelfInputAddress })
  }

  const handleButtonEdit = async () => {
    setModalVisible(false);
  }

  const updateOptions = async (value) => {
    if (value.length >= 1) {
      const result = await refetch({ query: { query: value } });
      let optionsList = [];
      if (result && result.data && result.data.iBuyerProjectsAutoComplete) {
        optionsList = result.data.iBuyerProjectsAutoComplete.map(item => item.value);
      };
      const options = optionsList.map(option => ({ key: option }));
      console.log('updateOptions')
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
      <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          presentationStyle="formSheet"
      >
        <View onLayout={handleLayout} style={styles.modalContainer}>
          <>
            <View style={styles.keyBoardContainer}>
              <View style={styles.viewBox1}/>
              <Headline>Confirm Your Address</Headline>
              <View style={styles.viewBox1}/>
              <TextInput
                label="Address"
                mode="outlined"
                value={value}
                textContentType="none"
                disabled={true}
                style={{ marginBottom: 100, color: 'white' }}
              />
              <Button mode="contained" style={styles.modalButton} onPress={handleButtonConfirm}>
                Confirm
              </Button>
              <Button mode="contained" style={styles.modalButton} onPress={handleButtonEdit}>
                Edit
              </Button>
              <View style={styles.viewBox3}/>
            </View>
          </>
        </View>
      </Modal>
      <AutocompleteView
        handleOnPress={handleOnPress}
        isValidAddress={isValidAddress}
        onChangeText={handleChangeText}
        onOptionPress={handleOptionPress}
        options={options}
        optionsListHeight={optionsListHeight}
        value={value}
        error={error}
      />
    </View>
  )
};

export default React.memo(Autocomplete);