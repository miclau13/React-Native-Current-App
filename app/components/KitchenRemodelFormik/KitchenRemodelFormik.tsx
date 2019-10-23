import { Formik, FormikConfig } from 'formik';
import React from 'react';

import { KitchenRemodelFormValues } from "../../screens/KitchenRemodelForm";

export interface KitchenRemodelFormikProps extends FormikConfig<KitchenRemodelFormValues> {};

const KitchenRemodelFormik: React.ComponentType<KitchenRemodelFormikProps> = (props) => {
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

export default React.memo(KitchenRemodelFormik);