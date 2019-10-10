import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import ZipCode from '../ZipCode';
import BathroomRemodelFormik from '../../components/BathroomRemodelFormik';

type Params = {};

type ScreenProps = {};

export interface BathroomRemodelFormValues {
  zipCode: string;
}

const BathroomRemodel: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "",
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Required').max(5),
  }), []);
  const onSubmit = React.useCallback(values => console.log(values), [])

  console.log("hi BathroomRemodel")
  return (
    <View style={styles.container}>
      <BathroomRemodelFormik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <ZipCode />
      </BathroomRemodelFormik>
    </View>
  )
};

export default React.memo(BathroomRemodel);