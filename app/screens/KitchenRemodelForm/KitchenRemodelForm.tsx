import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import MaintainFloor from '../MaintainFloor';
import ZipCode from '../ZipCode';
import KitchenRemodelFormik from '../../components/KitchenRemodelFormik';

type KitchenRemodelRoute = string;
type KitchenRemodelStep = "zipCode" | "maintainFloor";

type Params = {
  step: KitchenRemodelStep;
  backFrom?: KitchenRemodelStep;
  previousStep?: KitchenRemodelStep;
  remodelType?: string;
};

type ScreenProps = {};

const KitchenRemodelPreviousStepMap = {
  "zipCode": "home",
  "maintainFloor": "zipCode",
}

export const getPreviousStep = (currentstep: KitchenRemodelStep, route: KitchenRemodelRoute) => {
  return KitchenRemodelPreviousStepMap[currentstep];
};

export interface KitchenRemodelFormValues {
  zipCode: string;
  maintainFloor: string;
};

export interface KitchenRemodelFormProps {
  backFrom: KitchenRemodelStep;
  handleStepNavigation: (step: KitchenRemodelStep) => void;
}

const KitchenRemodelForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "",
      maintainFloor: "",
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.string().required('Maintain Floor is Required'),
  }), []);

  const onSubmit = React.useCallback(values => {
    // console.log("KitchenRemodelForm onsubmit vaues", values);
    navigation.navigate("CameraScreen", { formValues: values });
  }, []);

  const { navigation } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const remodelType = navigation.getParam("remodelType", "kitchenRemodel");
  const step = navigation.getParam("step", "zipCode");

  const handleStepNavigation = React.useCallback<KitchenRemodelFormProps['handleStepNavigation']>((nextStep) => {
    navigation.navigate("KitchenRemodelFormScreen", { backFrom: "", step: nextStep, previousStep: step });
  }, [step]);

  React.useEffect(() => {
    console.log("KitchenRemodelForm Mount");
    return () => {console.log("KitchenRemodelForm UnMount")}
  }, []);

  return (
    <KitchenRemodelFormik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        {step === "zipCode" ? 
          <ZipCode backFrom={backFrom} handleStepNavigation={handleStepNavigation} remodelType={remodelType} />
          : null
        }
        {step === "maintainFloor" ? 
          <MaintainFloor backFrom={backFrom} handleStepNavigation={handleStepNavigation} remodelType={remodelType} />
          : null
        }
      </View>
    </KitchenRemodelFormik>
  )
};

export default React.memo(KitchenRemodelForm);