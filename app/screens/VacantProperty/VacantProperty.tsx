import React from 'react';
import { ButtonGroupProps } from 'react-native-elements';
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import VacantPropertyView from './VacantPropertyView';
import { LoadingComponent } from '../InitialLoading';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = {
  createRehabNoArvInput: CreateRehabNoArvVariables['input'];
  rehabId?: string;
  rehabItemPackageId?: string;
};

type ScreenProps = {};

type VacantButtons = "NO" | "YES";

export interface VacantPropertyViewProps {
  buttons: VacantButtons[];
  handleButtonOnPress: ButtonProps['onPress'];
  handleOnPress: ButtonGroupProps['onPress'];
  vacantPropertyIndex: number;
};

const buttons: VacantButtons[] = ['NO', 'YES'];

const VacantProperty: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", null);

  const [loading] = React.useState(false);
  const [vacantPropertyIndex, setVacantPropertyIndex] = React.useState<VacantPropertyViewProps['vacantPropertyIndex']>(Number(createRehabNoArvInput.vacant));

  const moveToNextScreen = () => {
    const _createRehabNoArvInput = { ...createRehabNoArvInput, vacant: !!vacantPropertyIndex };
    navigation.navigate("CreateRehabScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput: _createRehabNoArvInput });
    // navigation.navigate("ContactPhoneNumberScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput: _createRehabNoArvInput });
  };

  const handleButtonOnPress: VacantPropertyViewProps['handleButtonOnPress'] = () => { 
    moveToNextScreen();
  };
  const handleOnPress: VacantPropertyViewProps['handleOnPress'] = (value) => {
    setVacantPropertyIndex(value);
  };

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <VacantPropertyView 
      buttons={buttons}
      handleButtonOnPress={handleButtonOnPress}
      handleOnPress={handleOnPress}
      vacantPropertyIndex={vacantPropertyIndex}
    />
  )
};

export default React.memo(VacantProperty);