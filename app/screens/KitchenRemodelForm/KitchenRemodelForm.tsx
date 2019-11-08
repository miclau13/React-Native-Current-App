import { mapValues } from 'lodash';
import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import KitchenAppliancesRemodel from '../KitchenAppliancesRemodel';
import KitchenEnhance from '../KitchenEnhance';
import KitchenFloorRemodel from '../KitchenFloorRemodel';
import KitchenRemodel from '../KitchenRemodel';
import MaintainFloor from '../MaintainFloor';
import ZipCode from '../ZipCode';
import KitchenRemodelFormik from '../../components/KitchenRemodelFormik';

export type KitchenRemodelRoute = "kitchenFloorRemodel" | "kitchenEnhance";
type KitchenRemodelStep = "zipCode" | "maintainFloor" | "kitchenFloorRemodel" | "kitchenEnhance" | "kitchenRemodel" | "kitchenAppliancesRemodel" ;
type RemodelType = "bathroomRemodel" | "kitchenRemodel";

type Params = {
  remodelType: RemodelType;
  route: KitchenRemodelRoute;
  step: KitchenRemodelStep;
  backFrom?: KitchenRemodelStep;
  previousStep?: KitchenRemodelStep;
};

type ScreenProps = {};

type KitchenRemodelField = {
  cabinet: number;
  counterTop: number;
  sink: number;
  stoveOrOven: number;
  appliances: number;
  backsplash: number;
  doorsOrDrawers: number;
};

type KitchenAppliancesRemodelField = {
  refrigerator: number;
  dishwasher: number;
  builtInMicrowave: number;
  stoveOrOven: number;
};

type KitchenFloorRemodelField = {
  kitchenFloor: number;
  kitchenWall: number;
  kitchenCeiling: number;
  floorOrWallOrCeilingRepairs: number;
};

const KitchenRemodelPreviousStepMap = {
  "zipCode": "home",
  "maintainFloor": "zipCode",
  "kitchenFloorRemodel": "maintainFloor",
  "kitchenEnhance": "maintainFloor",
  "kitchenAppliancesRemodel": "kitchenRemodel",
};

export const getPreviousStep = (currentstep: KitchenRemodelStep, route: KitchenRemodelRoute) => {
  if (currentstep === "kitchenRemodel") {
    return route;
  };
  return KitchenRemodelPreviousStepMap[currentstep];
};

export interface KitchenRemodelFormValues {
  zipCode: string;
  maintainFloor: string;
  kitchenRemodel: KitchenRemodelField;
  kitchenAppliancesRemodel: KitchenAppliancesRemodelField;
  kitchenFloorRemodel: KitchenFloorRemodelField;
  kitchenEnhance: string;
};

export interface KitchenRemodelFormProps {
  backFrom: KitchenRemodelStep;
  handleStepNavigation: (step: KitchenRemodelStep, options?: any) => void;
}

const KitchenRemodelForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "00501",
      maintainFloor: "",
      kitchenFloorRemodel: {
        kitchenFloor: 1,
        kitchenWall: 2,
        kitchenCeiling: 1,
        floorOrWallOrCeilingRepairs: 2,
      },
      kitchenEnhance: "",
      kitchenRemodel: {
        cabinet: 1,
        counterTop: 1,
        sink: 1,
        stoveOrOven: 1,
        appliances: 1,
        backsplash: 2,
        doorsOrDrawers: 2,
      },
      kitchenAppliancesRemodel: {
        refrigerator: 1,
        dishwasher: 1,
        builtInMicrowave: 1,
        stoveOrOven: 1,
      },
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.string().required('Maintain Floor is Required'),
    kitchenEnhance: yup.string().required('Kitchen Enhance is Required'),
    kitchenRemodel: yup.object().shape({
      cabinet: yup.number().required('Cabinet answer is Required'),
      counterTop: yup.number().required('Counter Top answer is Required'),
      sink: yup.number().required('Sink answer is Required'),
      stoveOrOven: yup.number().required('Stove/Oven answer is Required'),
      appliances: yup.number().required('Appliances answer is Required'),
      backsplash: yup.number().required('BackSplash answer is Required'),
      doorsOrDrawers: yup.number().required('Door/Drawers answer is Required'),
    }),
    kitchenAppliancesRemodel: yup.object().shape({
      refrigerator: yup.number().required('Refrigerator answer is Required'),
      dishwasher: yup.number().required('Dishwasher answer is Required'),
      builtInMicrowave: yup.number().required('Built-in Microwave answer is Required'),
      stoveOrOven: yup.number().required('Stove/Oven answer is Required'),
    }),
    kitchenFloorRemodel:  yup.object().shape({
      kitchenFloor: yup.number().required('Kitchen Floor answer is Required'),
      kitchenWall: yup.number().required('Kitchen Wall answer is Required'),
      kitchenCeiling: yup.number().required('Kitchen Ceiling answer is Required'),
      floorOrWallOrCeilingRepairs:  yup.number().required('Floor/Wall/Ceiling Repairs answer is Required'),
    })
  }), []);

  const onSubmit = React.useCallback(values => {
    // console.log("KitchenRemodelForm onsubmit vaues", values);
    const buttons = ['1', '2', '3', '4'];

    const mappedKitchenFloorRemodelValues = mapValues(values.kitchenFloorRemodel, function(index) { 
      return buttons[index] || ""; 
    });

    const mappedKitchenRemodelValues = mapValues(values.kitchenRemodel, function(index) { 
      return buttons[index] || ""; 
    });

    const mappedKitchenAppliancesRemodelValues = mapValues(values.kitchenAppliancesRemodel, function(index) { 
      return buttons[index] || ""; 
    });

    const mappedValues = { ...values, 
      kitchenFloorRemodel: mappedKitchenFloorRemodelValues,
      kitchenRemodel: mappedKitchenRemodelValues,
      kitchenAppliancesRemodel: mappedKitchenAppliancesRemodelValues,
    };
    // console.log("KitchenRemodelForm onsubmit mappedValues", mappedValues);
    navigation.navigate("CameraScreen", { formValues: mappedValues });
  }, []);

  const { navigation } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const remodelType = navigation.getParam("remodelType", "kitchenRemodel");
  const step = navigation.getParam("step", "zipCode");

  const handleStepNavigation = React.useCallback<KitchenRemodelFormProps['handleStepNavigation']>((nextStep, options = {}) => {
    const route = step === "kitchenFloorRemodel" || step === "kitchenEnhance" ? step : "";
    navigation.navigate("KitchenRemodelFormScreen", { route, backFrom: "", step: nextStep, previousStep: step, ...options });
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
        {step === "kitchenFloorRemodel" ? 
          <KitchenFloorRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenEnhance" ? 
          <KitchenEnhance backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenRemodel" ? 
          <KitchenRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "kitchenAppliancesRemodel" ? 
          <KitchenAppliancesRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
      </View>
    </KitchenRemodelFormik>
  )
};

export default React.memo(KitchenRemodelForm);