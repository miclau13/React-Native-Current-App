import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';

interface KitchenAppliancesRemodelProps {
  backFrom: KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: KitchenRemodelFormProps['handleStepNavigation'];
}

const KitchenAppliancesRemodel: React.ComponentType<KitchenAppliancesRemodelProps> = (props) => {
  const form = useFormikContext<KitchenRemodelFormValues>();
  const { setFieldValue, submitForm, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("kitchenAppliancesRemodel", { ...values.kitchenAppliancesRemodel, [value]: index });
  };
  
  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    console.log("KitchenAppeomdel handleButtonOnPress values", values)
    if(Object.values(values.kitchenAppliancesRemodel).includes(-1)) {
      return;
    };
    if (values.kitchenRemodel.cabinet === 0) {
      handleStepNavigation("kitchenCabinetRemodel");
    } else {
      submitForm();
    }
  };

  const buttons = ['YES', 'NO'];

  const buttonGroupList = [
    { buttons: buttons, name: "refrigerator", title: "Replace Refrigerator?"},
    { buttons: buttons, name: "dishwasher", title: "Replace dishwasher?"},
    { buttons: buttons, name: "builtInMicrowave", title: "Replace Built-in Microwave?"},
    { buttons: buttons, name: "stoveOrOven", title: "Replace Stove/Oven"},
  ];

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("KitchenAppliancesReomdel UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>I want to replace the followings appliances:</Headline>
      <View style={styles.viewBox1}/>
      {buttonGroupList.map(item => {
          return (
            <React.Fragment key={item.name}>
              <Title style={styles.title}>{item.title}</Title>
              <ButtonGroup
                buttons={item.buttons}
                onPress={handleOnPress(item.name)}
                selectedButtonStyle={styles.buttonSelectedContainer}
                selectedIndex={values.kitchenAppliancesRemodel[item.name]}
              />
            </React.Fragment>
          )
      })}
      <View style={styles.viewBox2}/>
      <Button
        mode="contained" 
        onPress={handleButtonOnPress}
        style={styles.buttonContainer}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(KitchenAppliancesRemodel);