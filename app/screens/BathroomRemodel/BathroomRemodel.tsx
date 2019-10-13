import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import MaintainFloor from '../MaintainFloor';
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
      maintainFloor: null,
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.boolean().required('maintainFloor is Required'),
  }), []);
  const onSubmit = React.useCallback(values => console.log(values), [])

  console.log("hi BathroomRemodel");
  const { navigation } = props;
  console.log({navigation})
  return (
    <View style={styles.container}>
      <BathroomRemodelFormik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formProps => {
          return (
            <ZipCode formProps={formProps} />
          )}

        }
        {/* <MaintainFloor /> */}
      </BathroomRemodelFormik>
    </View>
  )
};

export default React.memo(BathroomRemodel);