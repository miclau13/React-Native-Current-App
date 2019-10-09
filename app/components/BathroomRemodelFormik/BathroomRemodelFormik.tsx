import { Formik, FormikConfig } from 'formik';
import React from 'react';

import { BathroomRemodelFormValues } from "../../screens/BathroomRemodel";

export interface BathroomRemodelFormikProps extends FormikConfig<BathroomRemodelFormValues> {};

const BathroomRemodelFormik: React.ComponentType<BathroomRemodelFormikProps> = (props) => {
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

export default React.memo(BathroomRemodelFormik);