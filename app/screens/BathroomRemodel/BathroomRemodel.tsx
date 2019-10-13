import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import BathroomRemodelFormik from '../../components/BathroomRemodelFormik';

interface QuestionScreenProps {
  navigation: NavigationStackScreenProps['navigation'];
};

type Params = {
  questionScreen: React.ComponentType<QuestionScreenProps>;
};

type ScreenProps = {};

export interface BathroomRemodelFormValues {
  zipCode: string;
  maintainFloor: string;
}

const BathroomRemodel: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  console.log("hi BathroomRemodel");
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "",
      maintainFloor: "yes",
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.string().required('maintainFloor is Required'),
  }), []);
  const onSubmit = React.useCallback(values => console.log(values), [])

  const { navigation } = props;
  const questionScreen = navigation.getParam("questionScreen", null);
  console.log({navigation})
  return (
    <View style={styles.container}>
      <BathroomRemodelFormik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {questionScreen && React.createElement(questionScreen, { navigation }) }
      </BathroomRemodelFormik>
    </View>
  )
};

export default React.memo(BathroomRemodel);