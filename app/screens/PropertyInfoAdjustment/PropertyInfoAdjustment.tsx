import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, HelperText, TextInput, TextInputProps } from 'react-native-paper';

import styles from './styles';

interface PropertyInfoAdjustmentViewProps {
  handleStepNavigation: any;
  beds: number;
  sqft: number;
  fullBaths: number;
  threeQuarterBaths: number;
  halfBaths: number;
}

const PropertyInfoAdjustment: React.ComponentType<PropertyInfoAdjustmentViewProps>  = (props) => {
  const { beds, sqft, fullBaths, threeQuarterBaths, halfBaths, handleStepNavigation } = props;
  const [ _beds, set_beds ] = React.useState(beds?.toString() || '1');
  const [ _sqft, set_sqft ] = React.useState(sqft?.toString() || '1');
  const [ _fullBaths, set_fullBaths ] = React.useState(fullBaths?.toString() || '1');
  const [ _threeQuarterBaths, set_threeQuarterBaths ] = React.useState(threeQuarterBaths?.toString() || '0');
  const [ _halfBaths, set_halfBaths ] = React.useState(halfBaths?.toString() || '0');
  
  const handleOnChangeText: (key: string) => TextInputProps['onChangeText'] =  (key) => (text) => {
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

  const handleOnPress: ButtonProps['onPress'] = () => {
    if (+_beds < 1 || +_sqft < 1 || +_fullBaths < 1) {
      return;
    };
    handleStepNavigation("summary", { beds: +_beds, sqft: +_sqft, fullBaths: +_fullBaths, threeQuarterBaths: +_threeQuarterBaths, halfBaths: +_halfBaths });
  };

  React.useEffect(() => {
    console.log("PropertyInfoAdjustment Mount")
    return () => {console.log("PropertyInfoAdjustment UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Headline>No. Of Beds:</Headline>
        <TextInput
          error={+_beds < 1}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={handleOnChangeText("_beds")}
          value={_beds}
          textContentType="none"
        />
        <HelperText type="error" visible={+_beds < 1}>
          {"This field is required"}
        </HelperText>

        <Headline>Sq. ft.:</Headline>
        <TextInput
          error={_sqft.length < 1}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={handleOnChangeText("_sqft")}
          value={_sqft}
          textContentType="none"
        />
        <HelperText type="error" visible={+_sqft < 1}>
          {"This field is required"}
        </HelperText>

        <Headline>No. Of Full Baths:</Headline>
        <TextInput
          error={_fullBaths.length < 1}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={handleOnChangeText("_fullBaths")}
          value={_fullBaths}
          textContentType="none"
        />
        <HelperText type="error" visible={+_fullBaths < 1}>
          {"This field is required"}
        </HelperText>

        <Headline>No. Of Three Quarter Baths:</Headline>
        <TextInput
          error={!!_threeQuarterBaths && _threeQuarterBaths.length < 0}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={handleOnChangeText("_threeQuarterBaths")}
          value={_threeQuarterBaths}
          textContentType="none"
        />
        <HelperText type="error" visible={+_threeQuarterBaths < 0}>
          {"This field is required"}
        </HelperText>

        <Headline>No. Of Half Baths:</Headline>
        <TextInput
          error={!!_halfBaths && _halfBaths.length < 0}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={handleOnChangeText("_halfBaths")}
          value={_halfBaths}
          textContentType="none"
        />
        <HelperText type="error" visible={+_halfBaths < 0}>
          {"This field is required"}
        </HelperText>

        <Button 
          mode="contained" 
          onPress={handleOnPress}
          style={styles.nextButton}
        >
          Save
        </Button>
      </KeyboardAvoidingView>
    </View>
  );

}
export default React.memo(PropertyInfoAdjustment);