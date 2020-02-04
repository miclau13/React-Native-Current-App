import React from 'react';
import { Keyboard } from 'react-native';
import { ButtonProps, TextInputProps } from 'react-native-paper';

import PropertyInfoAdjustmentView from './PropertyInfoAdjustmentView';

interface PropertyInfoAdjustmentProps {
  handleTextInputOnBlur: TextInputProps['onBlur'];
  handleStepNavigation: any;
  beds: number;
  sqft: number;
  fullBaths: number;
  threeQuarterBaths: number;
  halfBaths: number;
};

export interface PropertyInfoAdjustmentViewProps {
  handleOnChangeText: (key: string) => TextInputProps['onChangeText'];
  handleButtonSaveOnPress: ButtonProps['onPress'];
  handleTextInputOnBlur: TextInputProps['onBlur'];
  _beds: string;
  _sqft: string;
  _fullBaths: string;
  _threeQuarterBaths: string;
  _halfBaths: string;
};

const PropertyInfoAdjustment: React.ComponentType<PropertyInfoAdjustmentProps> = (props) => {

  const { beds, sqft, fullBaths, threeQuarterBaths, halfBaths, handleStepNavigation } = props;
  const [ _beds, set_beds ] = React.useState(beds?.toString() || '1');
  const [ _sqft, set_sqft ] = React.useState(sqft?.toString() || '1');
  const [ _fullBaths, set_fullBaths ] = React.useState(fullBaths?.toString() || '1');
  const [ _threeQuarterBaths, set_threeQuarterBaths ] = React.useState(threeQuarterBaths?.toString() || '0');
  const [ _halfBaths, set_halfBaths ] = React.useState(halfBaths?.toString() || '0');
  
  const handleTextInputOnBlur: PropertyInfoAdjustmentViewProps['handleTextInputOnBlur'] = () => {
    Keyboard.dismiss();
  };
  const handleOnChangeText: PropertyInfoAdjustmentViewProps['handleOnChangeText'] = (key) => (text) => {
    switch (key) {
      case "_beds":
        set_beds(text);
        break;
      case "_sqft":
        set_sqft(text);
        break;
      case "_fullBaths":
        set_fullBaths(text);
        break;
      case "_threeQuarterBaths":
        set_threeQuarterBaths(text);
        break;
      case "_halfBaths":
        set_halfBaths(text);
        break;
      default:
    }
  };

  const handleButtonSaveOnPress: ButtonProps['onPress'] = () => {
    if (+_beds < 1 || +_sqft < 1 || +_fullBaths < 1) {
      return;
    };
    handleStepNavigation("summary", { beds: +_beds, sqft: +_sqft, fullBaths: +_fullBaths, threeQuarterBaths: +_threeQuarterBaths, halfBaths: +_halfBaths });
  };

  return (
    <PropertyInfoAdjustmentView 
      handleOnChangeText={handleOnChangeText}
      handleButtonSaveOnPress={handleButtonSaveOnPress}
      handleTextInputOnBlur={handleTextInputOnBlur}
      _beds={_beds}
      _sqft={_sqft}
      _fullBaths={_fullBaths}
      _threeQuarterBaths={_threeQuarterBaths}
      _halfBaths={_halfBaths}
    />
  );

}
export default React.memo(PropertyInfoAdjustment);