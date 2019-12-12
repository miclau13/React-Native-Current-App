import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, ButtonProps, Headline, HelperText, TextInput, TextInputProps } from 'react-native-paper';

import styles from './styles';

interface ProfitSummaryViewProps {
  arv: number;
  asIs: number;
  // TODO type
  handleStepNavigation: any;
}

const ProfitAdjustment: React.ComponentType<ProfitSummaryViewProps>  = (props) => {
  const { arv, asIs, handleStepNavigation } = props;
  const [ARV, setARV] = React.useState(arv.toString());
  const [ASIS, setASIS] = React.useState(asIs.toString());

  const handleOnChangeText: (key: string) => TextInputProps['onChangeText'] =  (key) => (text) => {
    if (key === "ARV") {
      setARV(text);
    } else if (key === "ASIS"){
      setASIS(text);
    }
  };

  const handleOnPress: ButtonProps['onPress'] = () => {
    if (ARV.length < 1 || ASIS.length < 1) {
      return;
    };
    handleStepNavigation("summary", { arv: +ARV, asIs: +ASIS });
  }

  React.useEffect(() => {
    console.log("ProfitAdjustment Mount")
    return () => {console.log("ProfitAdjustment UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.viewBox1}/>
        <Headline>ARV Estimate:</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          error={ARV.length < 1}
          keyboardType="number-pad"
          label="$"
          mode="outlined"
          onChangeText={handleOnChangeText("ARV")}
          value={ARV}
          textContentType="none"
        />
        <HelperText 
          type="error"
          visible={ARV.length < 1}
        >
          {"This field is required"}
        </HelperText>
        {/* <View style={styles.viewBox2}/> */}
        <View style={styles.viewBox1}/>
        <Headline>As-Is :</Headline>
        <View style={styles.viewBox1}/>
        <TextInput
          error={ASIS.length < 1}
          keyboardType="number-pad"
          label="$"
          mode="outlined"
          onChangeText={handleOnChangeText("ASIS")}
          value={ASIS}
          textContentType="none"
        />
        <HelperText 
          type="error"
          visible={ASIS.length < 1}
        >
          {"This field is required"}
        </HelperText>
        <Button 
          mode="contained" 
          onPress={handleOnPress}
          style={styles.nextButton}
        >
          Confirm
        </Button>
        <View style={styles.viewBox3}/>
      </KeyboardAvoidingView>
    </View>
  );
}
export default React.memo(ProfitAdjustment);