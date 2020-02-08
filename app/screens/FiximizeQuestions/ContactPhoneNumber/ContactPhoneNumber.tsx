import { FormikErrors, useFormikContext } from 'formik';
import React from 'react';
import { ButtonProps } from 'react-native-paper';

import { FiximizeQuestionsFormProps, FiximizeQuestionsFormValues } from '../FiximizeQuestionsForm';
import ContactPhoneNumberView from './ContactPhoneNumberView';

interface ContactPhoneNumberProps {
  backFrom: FiximizeQuestionsFormProps['backFrom'];
  handleStepNavigation: FiximizeQuestionsFormProps['handleStepNavigation'];
};

export interface ContactPhoneNumberViewProps {
  errors: FormikErrors<FiximizeQuestionsFormValues>;
  handleButtonOnPress: ButtonProps['onPress'];
  values: FiximizeQuestionsFormValues;
};

const ContactPhoneNumber: React.ComponentType<ContactPhoneNumberProps> = (props) => {
  const form = useFormikContext<FiximizeQuestionsFormValues>();
  const { errors, submitForm, values } = form;
  const { backFrom } = props;

  const handleButtonOnPress: ContactPhoneNumberViewProps['handleButtonOnPress'] = () => {
    if(errors && errors["contactPhoneNumber"]) {
      return;
    };
    submitForm();
  };

  React.useEffect(() => {
    console.log("ContactPhoneNumber Mount")
    if (!!backFrom) {
      // form.setFieldValue(backFrom, form.initialValues[backFrom]);
    };
    return () => {console.log("ContactPhoneNumber UnMount")}
  }, []);

  return (
    <ContactPhoneNumberView 
      errors={errors}
      handleButtonOnPress={handleButtonOnPress}
      values={values}
    />
  );
}
export default React.memo(ContactPhoneNumber);