import { Formik, FormikConfig } from 'formik';
import React from 'react';

import { FiximizeQuestionsFormValues } from "../../../screens/FiximizeQuestions/FiximizeQuestionsForm";

export interface FiximizeQuestionsFormikProps extends FormikConfig<FiximizeQuestionsFormValues> {};

const FiximizeQuestionsFormik: React.ComponentType<FiximizeQuestionsFormikProps> = (props) => {
  const { initialValues, onSubmit } = props;
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...props}
    />
  )
};

export default React.memo(FiximizeQuestionsFormik);