import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import AsIsEstimate from '../AsIsEstimate';
import Address from '../Address';
import HalfBathSize from '../HalfBathSize';
import KitchenCabinetSize from '../KitchenCabinetSize';
import FiximizeQuestionsFormik from '../../../components/FiximizeQuestions/FiximizeQuestionsFormik';

type FiximizeQuestionsStep = "asIsEstimate" | "address" | "halfBathSize" | "kitchenWallCabinetSize" | "kitchenBaseCabinetSize" | "kitchenIslandCabinetSize";

type Params = {
  step: FiximizeQuestionsStep;
  backFrom?: FiximizeQuestionsStep;
  previousStep?: FiximizeQuestionsStep;
};

type ScreenProps = {};

const FiximizeQuestionsPreviousStepMap = {
  "address": "home",
  "asIsEstimate": "address",
  "halfBathSize": "asIsEstimate",
};

export const getPreviousStep = (currentstep: FiximizeQuestionsStep, route: any) => {
  // let route decide the previous step (enhance or maintain floor) if the current step is kitchenRemodel
  // if (currentstep === "kitchenRemodel") {
  //   return route;
  // // the previous step must be kitchenRemodel if the current step is appliancesor cabinet
  // } else if (currentstep === "kitchenAppliancesRemodel" || currentstep === "kitchenCabinetRemodel") {
  //   return "kitchenRemodel";
  // }
  // return FiximizeQuestionsPreviousStepMap[currentstep];
};

export interface FiximizeQuestionsFormValues {
  address: string;
  asIsEstimate: string;
  halfBathSize: string;
};

export interface FiximizeQuestionsFormProps {
  backFrom: FiximizeQuestionsStep;
  handleStepNavigation: (step: FiximizeQuestionsStep, options?: any) => void;
}

const FiximizeQuestionsForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      address: "",
      asIsEstimate: "",
      halfBathSize: "",
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    address: yup.string().required('Address is Required'),
    asIsEstimate: yup.string().required('As-Is Estimate is Required'),
    halfBathSize: yup.string().required('Half Bath Size is Required'),
  }), []);

  const onSubmit = React.useCallback(values => {
    console.log("FiximizeQuestionsForm onsubmit vaues", values);
    navigation.navigate("PricingScreen");
    // const buttons = ['1', '2', '3', '4'];

    // const mappedKitchenFloorRemodelValues = mapValues(values.kitchenFloorRemodel, function(index) { 
    //   return buttons[index] || ""; 
    // });

    // const mappedFiximizeQuestionsValues = mapValues(values.kitchenRemodel, function(index) { 
    //   return buttons[index] || ""; 
    // });

    // const mappedKitchenAppliancesRemodelValues = mapValues(values.kitchenAppliancesRemodel, function(index) { 
    //   return buttons[index] || ""; 
    // });

    // const mappedKitchenCabinetRemodelValues = mapValues(values.kitchenCabinetRemodel, function(value) { 
    //   return Number(value); 
    // });

    // const mappedValues = { ...values, 
    //   kitchenFloorRemodel: mappedKitchenFloorRemodelValues,
    //   kitchenRemodel: mappedFiximizeQuestionsValues,
    //   kitchenAppliancesRemodel: mappedKitchenAppliancesRemodelValues,
    //   kitchenCabinetRemodel: mappedKitchenCabinetRemodelValues,
    // };
    // // console.log("FiximizeQuestionsForm onsubmit mappedValues", mappedValues);
    // navigation.navigate("CameraScreen", { formValues: mappedValues });
  }, []);

  const { navigation } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const step = navigation.getParam("step", "address");

  const kitchenCabinetSizefields = React.useMemo(() => {
    return [
      { name: "kitchenWallCabinetSize", description: "Wall", nextItem: "kitchenBaseCabinetSize"},
      { name: "kitchenBaseCabinetSize", description: "Base", nextItem: "kitchenIslandCabinetSize"},
      { name: "kitchenIslandCabinetSize", description: "Island", nextItem: ""},
    ]
  }, []);

  const bathroomSizefields = React.useMemo(() => {
    return [
      { name: "kitchenWallCabinetSize", description: "1", nextItem: "kitchenBaseCabinetSize"},
      { name: "kitchenBaseCabinetSize", description: "2", nextItem: "kitchenIslandCabinetSize"},
      { name: "kitchenIslandCabinetSize", description: "3", nextItem: ""},
    ]
  }, []);

  console.log("step in FiximizeQuestionsForm", step)

  const handleStepNavigation = React.useCallback<FiximizeQuestionsFormProps['handleStepNavigation']>((nextStep, options = {}) => {
    // if next step is appliances or cabinet, step must be kitchenRemodel
    // const route = step === "kitchenFloorRemodel" || step === "kitchenEnhance" ? step : 
    //   nextStep === "kitchenAppliancesRemodel" || nextStep === "kitchenCabinetRemodel" ? routeToFiximizeQuestions : 
    //   "";
    navigation.navigate("FiximizeQuestionsFormScreen", { backFrom: "", step: nextStep, previousStep: step, ...options });
  }, [step]);

  React.useEffect(() => {
    console.log("FiximizeQuestionsForm Mount");
    return () => {console.log("FiximizeQuestionsForm UnMount")}
  }, []);

  return (
    <FiximizeQuestionsFormik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        {step === "address" ? 
          <Address backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "asIsEstimate" ? 
          <AsIsEstimate backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "halfBathSize" ? 
          <HalfBathSize backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenWallCabinetSize" ? 
          <KitchenCabinetSize backFrom={backFrom} field={kitchenCabinetSizefields[0]} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenBaseCabinetSize" ? 
          <KitchenCabinetSize backFrom={backFrom} field={kitchenCabinetSizefields[1]} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenIslandCabinetSize" ? 
          <KitchenCabinetSize backFrom={backFrom} field={kitchenCabinetSizefields[2]} handleStepNavigation={handleStepNavigation} />
          : null
        }
      </View>
    </FiximizeQuestionsFormik>
  )
};

export default React.memo(FiximizeQuestionsForm);