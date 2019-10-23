import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import BathroomFloorRemodel from '../BathroomFloorRemodel';
import BathroomRemodel from '../BathroomRemodel';
import EnhanceBathroom from '../EnhanceBathroom';
import MaintainFloor from '../MaintainFloor';
import ZipCode from '../ZipCode';
import BathroomRemodelFormik from '../../components/BathroomRemodelFormik';

type BathroomRemodelStep = "zipCode" | "maintainFloor" | "enhanceBathroom" | "bathroomFloorRemodel" | "bathroomRemodel";
export type BathroomRemodelRoute = "bathroomFloorRemodel" |  "enhanceBathroom";
type RemodelType = "bathroomRemodel" | "kitchenRemodel";

type Params = {
  remodelType: RemodelType;
  route: BathroomRemodelRoute;
  step: BathroomRemodelStep;
  backFrom?: BathroomRemodelStep;
  previousStep?: BathroomRemodelStep;
};

type ScreenProps = {};

type BathroomRemodelField = {
  bathtub: number;
  showerStall: number;
  toilet: number;
  sink: number;
  vanity: number;
  medicineCabinet: number;
  mirror: number;
  fiberGlassShowerDoor: number;
};

type BathroomFloorRemodelField = {
  bathroomFloor: number,
  bathOrShowerWall: number,
  bathroomWall: number,
  bathroomCeiling: number,
  floorOrWallOrCeilingRepairs: number,
};

const bathroomRemodelPreviousStepMap = {
  "zipCode": "home",
  "maintainFloor": "zipCode",
  "enhanceBathroom": "maintainFloor",
  "bathroomFloorRemodel": "maintainFloor",
  "camera": "bathroomRemodel",
}

export const getPreviousStep = (currentstep: BathroomRemodelStep, route: BathroomRemodelRoute) => {
  if (currentstep === "bathroomRemodel") {
    return route;
  };
  return bathroomRemodelPreviousStepMap[currentstep];
};

export interface BathroomRemodelFormValues {
  zipCode: string;
  maintainFloor: string;
  enhanceBathroom: string;
  bathroomRemodel: BathroomRemodelField;
  bathroomFloorRemodel: BathroomFloorRemodelField;
};

export interface BathroomRemodelFormProps {
  backFrom: BathroomRemodelStep;
  handleStepNavigation: (step: BathroomRemodelStep) => void;
}

const BathroomRemodelForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const initialValues = React.useMemo(() => {
    return ({
      zipCode: "",
      maintainFloor: "",
      enhanceBathroom: "",
      bathroomRemodel: {
        bathtub: null,
        showerStall: null,
        toilet: null,
        sink: null,
        vanity: null,
        medicineCabinet: null,
        mirror: null,
        fiberGlassShowerDoor: null,
      },
      bathroomFloorRemodel: {
        bathroomFloor: -1,
        bathOrShowerWall: -1,
        bathroomWall: -1,
        bathroomCeiling: -1,
        floorOrWallOrCeilingRepairs: -1,
      },
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.string().required('Maintain Floor is Required'),
    enhanceBathroom: yup.string().required('Enhance Bathroom is Required'),
    bathroomRemodel: yup.object().shape({
      bathtub: yup.number().required('Bathtub answer is Required'),
      showerStall: yup.number().required('Shower Stall answer is Required'),
      toilet: yup.number().required('Toilet answer is Required'),
      sink: yup.number().required('Sink answer is Required'),
      vanity: yup.number().required('Vanity answer is Required'),
      medicineCabinet: yup.number().required('Medicine Cabinet answer is Required'),
      mirror: yup.number().required('Mirror answer is Required'),
      fiberGlassShowerDoor: yup.number().required('Fiber Glass Shower Door answer is Required'),
    }),
    bathroomFloorRemodel: yup.object().shape({
      bathroomFloor: yup.number().required('Bathroom Floor answer is Required'),
      bathOrShowerWall: yup.number().required('Bath/Shower Wall answer is Required'),
      bathroomWall: yup.number().required('Bathroom Wall answer is Required'),
      bathroomCeiling: yup.number().required('Bathroom Ceiling answer is Required'),
      floorOrWallOrCeilingRepairs: yup.number().required('Floor/Wall/Ceiling Repairs answer is Required'),
    }),
  }), []);

  const onSubmit = React.useCallback(values => {
    console.log("BathroomRemodelForm onsubmit vaues", values);
    navigation.navigate("CameraScreen", { formValues: values });
  }, []);

  const { navigation } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const remodelType = navigation.getParam("remodelType", "bathroomRemodel");
  const route = navigation.getParam("route", null);
  const step = navigation.getParam("step", "zipCode");

  const handleStepNavigation = React.useCallback<BathroomRemodelFormProps['handleStepNavigation']>((nextStep) => {
    const route = step === "bathroomFloorRemodel" || step === "enhanceBathroom" ? step : "";
    navigation.navigate("BathroomRemodelFormScreen", { route, backFrom: "", step: nextStep, previousStep: step });
  }, [step]);

  React.useEffect(() => {
    console.log("BathroomRemodelForm Mount");
    return () => {console.log("BathroomRemodelForm UnMount")}
  }, []);

  return (
    <BathroomRemodelFormik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        {step === "zipCode" ? 
          <ZipCode backFrom={backFrom} remodelType={remodelType} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "maintainFloor" ? 
          <MaintainFloor backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "enhanceBathroom" ? 
          <EnhanceBathroom backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "bathroomFloorRemodel" ? 
          <BathroomFloorRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {step === "bathroomRemodel" ? 
          <BathroomRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} route={route} />
          : null
        }
      </View>
    </BathroomRemodelFormik>
  )
};

export default React.memo(BathroomRemodelForm);