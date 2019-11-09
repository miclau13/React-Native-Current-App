import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';

interface KitchenRemodelProps {
  backFrom: KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: KitchenRemodelFormProps['handleStepNavigation'];
}

const KitchenRemodel: React.ComponentType<KitchenRemodelProps> = (props) => {
  const form = useFormikContext<KitchenRemodelFormValues>();
  const { setFieldValue, submitForm, values  } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("kitchenRemodel", { ...values.kitchenRemodel, [value]: index });
  };
  
  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(Object.values(values.kitchenRemodel).includes(-1)) {
      return;
    };
    const replaceAppliances = values.kitchenRemodel.appliances === 0;
    const replaceCabinet = values.kitchenRemodel.cabinet === 0;
    if (replaceAppliances) {
      handleStepNavigation("kitchenAppliancesRemodel");
    } else if (replaceCabinet) {
      handleStepNavigation("kitchenCabinetRemodel");
    } else {
      submitForm();
    }
  };

  const buttons = ['Replace', 'Keep', 'Don’t Have'];
  const buttonsForBacksplash = ['Replace', 'Repair', 'Keep', 'Add'];
  const buttonsForDoors = ['Replace', 'Repair', 'Keep', 'Resurface'];

  const buttonGroupList = [
    { buttons: buttons, name: "cabinet", title: "Cabinet?"},
    { buttons: buttons, name: "counterTop", title: "Counter Top?"},
    { buttons: buttons, name: "sink", title: "Sink?"},
    { buttons: buttons, name: "stoveOrOven", title: "Stove/Oven?"},
    { buttons: buttons, name: "appliances", title: "Appliances?"},
    { buttons: buttonsForBacksplash, name: "backsplash", title: "Backsplash?"},
    { buttons: buttonsForDoors, name: "doorsOrDrawers", title: "Doors/Drawers?"},
  ];

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("KitchenFloorReomdel UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>I want to replace or repair the followings:</Headline>
      <View style={styles.viewBox1}/>
      {buttonGroupList.map(item => {
          return (
            <React.Fragment key={item.name}>
              <Title style={styles.title}>{item.title}</Title>
              <ButtonGroup
                buttons={item.buttons}
                onPress={handleOnPress(item.name)}
                selectedButtonStyle={styles.buttonSelectedContainer}
                selectedIndex={values.kitchenRemodel[item.name]}
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
export default React.memo(KitchenRemodel);