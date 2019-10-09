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
  zipCode: number;
}

const BathroomRemodel: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: null,
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup
      .number()
      .max(5)
      .required(),
  }), []);

  const onSubmit = React.useCallback(values => console.log(values), [])

  console.log("hi BathroomRemodel")
  return (
    <View style={styles.container}>
      <BathroomRemodelFormik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        <ZipCode navigation={props.navigation}/>
      </BathroomRemodelFormik>
    </View>
  )
};

export default React.memo(BathroomRemodel);