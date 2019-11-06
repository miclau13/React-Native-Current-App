import { useFormikContext } from 'formik';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, ButtonProps, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues, BathroomRemodelRoute } from '../BathroomRemodelForm';

interface BathroomRemodelProps {
  backFrom: BathroomRemodelFormProps['backFrom'];
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
  route: BathroomRemodelRoute;
}

const BathroomRemodel: React.ComponentType<BathroomRemodelProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, submitForm, values } = form;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("bathroomRemodel", { ...values.bathroomRemodel, [value]: index });
  };

  const handleOnSubmit: ButtonProps['onPress'] = () => {
    // console.log("BathroomRemodel handleOnSubmit")
    // console.log("BathroomRemodel values", values)
    submitForm();
  };

  const buttons = ['Replace', 'Keep', 'Don’t Have'];
  const buttonGroupList = [
    { name: "bathtub", title: "Bathtub?"},
    { name: "showerStall", title: "Shower Stall?"},
    { name: "toilet", title: "Toilet?"},
    { name: "sink", title: "Sink?"},
    { name: "vanity", title: "Vanity?"},
    { name: "medicineCabinet", title: "Medicine Cabinet?"},
    { name: "mirror", title: "Mirror?"},
    { name: "fiberGlassShowerDoor", title: "Fiber Glass Shower Door?"},
  ];

  React.useEffect(() => {
    return () => {console.log("BathroomReomdel UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.viewBox1}/>
        <Headline>I want to replace or keep the followings:</Headline>
        <View style={styles.viewBox1}/>
        {buttonGroupList.map(item => {
          return (
            <React.Fragment key={item.name}>
              <Title style={styles.title}>{item.title}</Title>
              <ButtonGroup
                buttons={buttons}
                onPress={handleOnPress(item.name)}
                selectedButtonStyle={styles.buttonSelectedContainer}
                selectedIndex={values.bathroomRemodel[item.name]}
              />
            </React.Fragment>
          )
        })}
        <View style={styles.viewBox2}/>
        <Button
          mode="contained" 
          onPress={handleOnSubmit}
          style={styles.buttonContainer}
        >
          Next
        </Button>
        <View style={styles.viewBox3}/>
      </ScrollView>
    </View>
  );
}
export default React.memo(BathroomRemodel);