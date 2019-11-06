import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface BathroomFloorRemodelProps {
  backFrom: BathroomRemodelFormProps['backFrom'];
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
}

const BathroomFloorRemodel: React.ComponentType<BathroomFloorRemodelProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { backFrom, handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("bathroomFloorRemodel", { ...values.bathroomFloorRemodel, [value]: index });
  };
  
  const handleButtonOnPress: ButtonProps['onPress'] = () => {
    console.log(values.bathroomFloorRemodel)
    if(Object.values(values.bathroomFloorRemodel).includes(-1)) {
      return;
    };
    setFieldValue("enhanceBathroom", "NA");
    handleStepNavigation("bathroomRemodel");
  };

  const buttons = ['Replace', 'Keep', 'Don’t Have'];
  const buttonsForBathroomFloor = ['Replace', 'Repair', 'Keep'];
  const buttonsForRepairs = ['Replace All', 'Repair All', 'Keep'];

  const buttonGroupList = [
    { buttons: buttons, name: "bathroomFloor", title: "Bathroom Floor?"},
    { buttons: buttons, name: "bathOrShowerWall", title: "Bath/Shower Wall?"},
    { buttons: buttonsForBathroomFloor, name: "bathroomWall", title: "Bathroom Wall?"},
    { buttons: buttonsForBathroomFloor, name: "bathroomCeiling", title: "Bathroom Ceiling?"},
    { buttons: buttonsForRepairs, name: "floorOrWallOrCeilingRepairs", title: "Floor/Wall/Ceiling Repairs?"},
  ];

  React.useEffect(() => {
    if (!!backFrom) {
      form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("BathroomFloorReomdel UnMount")}
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>I want to reduce or repair the followings:</Headline>
      <View style={styles.viewBox1}/>
      {buttonGroupList.map(item => {
          return (
            <React.Fragment key={item.name}>
              <Title style={styles.title}>{item.title}</Title>
              <ButtonGroup
                buttons={item.buttons}
                onPress={handleOnPress(item.name)}
                selectedButtonStyle={styles.buttonSelectedContainer}
                selectedIndex={values.bathroomFloorRemodel[item.name]}
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
export default React.memo(BathroomFloorRemodel);