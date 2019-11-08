import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { KitchenRemodelFormProps, KitchenRemodelFormValues } from '../KitchenRemodelForm';

interface KitchenFloorRemodelProps {
  backFrom: KitchenRemodelFormProps['backFrom'];
  handleStepNavigation: KitchenRemodelFormProps['handleStepNavigation'];
}

const KitchenFloorRemodel: React.ComponentType<KitchenFloorRemodelProps> = (props) => {
  const form = useFormikContext<KitchenRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("kitchenFloorRemodel", { ...values.kitchenFloorRemodel, [value]: index });
  };
  
  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    if(Object.values(values.kitchenFloorRemodel).includes(-1)) {
      return;
    };
    setFieldValue("kitchenEnhance", "NA");
    handleStepNavigation("kitchenRemodel");
  };

  const buttonsForKitchenFloor = ['New Flooring', 'OK As Is'];
  const buttonsForKitchenWall = ['Repaint', 'Retile', 'OK As Is'];
  const buttonsForKitchenCeiling = ['Repaint', 'OK As Is'];
  const buttons = ['Minor', 'Major', 'OK As Is'];

  const buttonGroupList = [
    { buttons: buttonsForKitchenFloor, name: "kitchenFloor", title: "Kitchn Floor?"},
    { buttons: buttonsForKitchenWall, name: "kitchenWall", title: "Kitchen Wall?"},
    { buttons: buttonsForKitchenCeiling, name: "kitchenCeiling", title: "Kitchen Ceiling?"},
    { buttons: buttons, name: "floorOrWallOrCeilingRepairs", title: "Floor/Wall/Ceiling Repairs?"},
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
                selectedIndex={values.kitchenFloorRemodel[item.name]}
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
export default React.memo(KitchenFloorRemodel);