import { gql } from 'apollo-boost';
import React from 'react';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useLazyQuery } from '@apollo/react-hooks';

import ContactPhoneNumberView from './ContactPhoneNumberView';
import { checkIfFormatValid, validateFormat } from './utils';
import { LoadingComponent } from '../InitialLoading';
import CheckEmailVerified, { CheckEmailVerifiedProps } from '../../components/CheckEmailVerified';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

const VIEWER = gql`
  query Viewer {
    viewer {
      id
      emailVerified
    }
  }
`;

export interface Params {
  createRehabNoArvInput: CreateRehabNoArvVariables['input'];
  rehabId?: string;
  rehabItemPackageId?: string;
};

type ScreenProps = {};

export interface ContactPhoneNumberViewProps {
  contactPhoneNumber: string;
  contactPhoneNumberIsValid: boolean;
  handleButtonOnPress: ButtonProps['onPress'];
  handleOnChangeText: TextInputProps['onChangeText'];
};

const ContactPhoneNumber: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", null);

  const [emailVerified, setEmailVerified] = React.useState(false);

  const [viewerQuery, { error, called: viewerQueryCalled, loading: viewerQueryLoading }] = useLazyQuery(VIEWER,  { 
    onCompleted: (data) => {
      if (!error && data?.viewer?.emailVerified) {
        setEmailVerified(data.viewer.emailVerified)
      };
    },
  });

  const [contactPhoneNumber, setContactPhoneNumber] = React.useState((createRehabNoArvInput.contactPhoneNumber) || "+1 ");
  const [contactPhoneNumberIsValid, setContactPhoneNumberIsValid] = React.useState(true);

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = async () => {
    const valueIsValid = checkIfFormatValid(contactPhoneNumber);
    if (!valueIsValid) {
      setContactPhoneNumberIsValid(false);
    } else {
      setContactPhoneNumberIsValid(true);
      if (emailVerified) {
        const _createRehabNoArvInput = { ...createRehabNoArvInput, contactPhoneNumber };
        navigation.navigate("FullRemodelSummaryScreen", { rehabId, rehabItemPackageId, createRehabNoArvInput: _createRehabNoArvInput });
      } else {
        viewerQuery();
      }
    }
  };
  const handleOnChangeText: ContactPhoneNumberViewProps['handleOnChangeText'] = (value) => {
    const validValue = validateFormat(value);
    setContactPhoneNumber(validValue);
  };

  // For CheckEmailVerified
  const confirmEmailVerified = () => {
    // navigation.setParams({ step: "summary" });
  };
  const handleBackdropOnPress: CheckEmailVerifiedProps['handleBackdropOnPress'] = () => {
    confirmEmailVerified();
  };
  
  console.log("emailVerified",emailVerified)

  if (viewerQueryCalled && viewerQueryLoading) {
    return (
      <LoadingComponent />
    );
  };


  return (
    <>
      <CheckEmailVerified
        handleBackdropOnPress={handleBackdropOnPress}
        handleButtonOnPress={handleButtonOnPress}
        modalVisible={!emailVerified}
      />
      <ContactPhoneNumberView 
        handleButtonOnPress={handleButtonOnPress}
        contactPhoneNumber={contactPhoneNumber}
        contactPhoneNumberIsValid={contactPhoneNumberIsValid}
        handleOnChangeText={handleOnChangeText}
      />
    </>
  );
}
export default React.memo(ContactPhoneNumber);