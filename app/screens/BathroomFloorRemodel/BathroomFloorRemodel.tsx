import { useFormikContext } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ButtonGroup, ButtonGroupProps } from 'react-native-elements';
import { Button, Headline, Title } from 'react-native-paper';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';

interface BathroomFloorRemodelProps  {
  navigation: NavigationStackScreenProps['navigation'];
}

const BathroomFloorRemodel: React.ComponentType<BathroomFloorRemodelProps> = (props) => {
  const form = useFormikContext<BathroomRemodelFormValues>();
  const { setFieldValue, values } = form;
  const { navigation } = props;

  const handleOnPress: (value: string) => ButtonGroupProps['onPress'] = (value) => (index) => {
    setFieldValue("bathroomFloorRemodel", { ...values.bathroomFloorRemodel, [value]: index });
  };

  const buttons = ['Replace', 'Keep', 'Don’t Have'];
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.viewBox1}/>
      <Headline>I want to retile or repair the followings:</Headline>
      <View style={styles.viewBox1}/>
      <Title style={styles.title}>Bathroom Floor?</Title>
      <ButtonGroup
        onPress={handleOnPress("bathroomFloor")}
        selectedIndex={values.bathroomFloorRemodel.bathroomFloor}
        buttons={buttons}
      />
      <Title style={styles.title}>Bath/Shower Wall?</Title>
      <ButtonGroup
        onPress={handleOnPress("bathOrShowerWall")}
        selectedIndex={values.bathroomFloorRemodel.bathOrShowerWall}
        buttons={buttons}
      />
      <Title style={styles.title}>Bathroom Wall?</Title>
      <ButtonGroup
        onPress={handleOnPress("bathroomWall")}
        selectedIndex={values.bathroomFloorRemodel.bathroomWall}
        buttons={buttons}
      />
      <Title style={styles.title}>Bathroom Ceiling?</Title>
      <ButtonGroup
        onPress={handleOnPress("bathroomCeiling")}
        selectedIndex={values.bathroomFloorRemodel.bathroomCeiling}
        buttons={buttons}
      />
      <Title style={styles.title}>Floor/Wall/Ceiling Repairs?</Title>
      <ButtonGroup
        onPress={handleOnPress("floorOrWallOrCeilingRepairs")}
        selectedIndex={values.bathroomFloorRemodel.floorOrWallOrCeilingRepairs}
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
export default React.memo(BathroomFloorRemodel);