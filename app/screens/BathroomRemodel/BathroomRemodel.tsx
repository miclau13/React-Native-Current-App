import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, Headline, Title } from 'react-native-paper';

import styles from './styles';
import { BathroomRemodelFormProps, BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface BathroomRemodelProps  {
  handleStepNavigation: BathroomRemodelFormProps['handleStepNavigation'];
}

const BathroomRemodel: React.ComponentType<BathroomRemodelProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { handleStepNavigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("bathroomRemodel", { ...values.bathroomRemodel, [value]: index });
  };

  const buttons = ['Replace', 'Keep', 'Don’t Have'];
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>I want to replace or keep the followings:</Headline>
      <View style={styles.viewBox1}/>
      <Title style={styles.title}>Bathtub?</Title>
      <ButtonGroup
        onPress={handleOnPress("bathtub")}
        selectedIndex={values.bathroomRemodel.bathtub}
        buttons={buttons}
      />
      <Title style={styles.title}>Shower Stall?</Title>
      <ButtonGroup
        onPress={handleOnPress("showerStall")}
        selectedIndex={values.bathroomRemodel.showerStall}
        buttons={buttons}
      />
      <Title style={styles.title}>Toilet?</Title>
      <ButtonGroup
        onPress={handleOnPress("toilet")}
        selectedIndex={values.bathroomRemodel.toilet}
        buttons={buttons}
      />
      <Title style={styles.title}>Sink?</Title>
      <ButtonGroup
        onPress={handleOnPress("sink")}
        selectedIndex={values.bathroomRemodel.sink}
        buttons={buttons}
      />
      <Title style={styles.title}>Vanity?</Title>
      <ButtonGroup
        onPress={handleOnPress("vanity")}
        selectedIndex={values.bathroomRemodel.vanity}
        buttons={buttons}
      />
      <Title style={styles.title}>Medicine Cabinet?</Title>
      <ButtonGroup
        onPress={handleOnPress("medicineCabinet")}
        selectedIndex={values.bathroomRemodel.medicineCabinet}
        buttons={buttons}
      />
      <Title style={styles.title}>Mirror?</Title>
      <ButtonGroup
        onPress={handleOnPress("mirror")}
        selectedIndex={values.bathroomRemodel.mirror}
        buttons={buttons}
      />
      <Title style={styles.title}>Fiber Glass Shower Door?</Title>
      <ButtonGroup
        onPress={handleOnPress("fiberGlassShowerDoor")}
        selectedIndex={values.bathroomRemodel.fiberGlassShowerDoor}
        buttons={buttons}
      />
      <View style={styles.viewBox2}/>
      <Button
        mode="contained" 
        onPress={()=>{}}
        style={styles.buttonContainer}
      >
        Next
      </Button>
      <View style={styles.viewBox3}/>
    </KeyboardAvoidingView>
  );
}
export default React.memo(BathroomRemodel);