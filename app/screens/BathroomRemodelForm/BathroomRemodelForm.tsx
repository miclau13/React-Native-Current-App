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

type BathroomRemodelStep = "zipCode" | "maintainFloor" | "enhanceBathroom" | "bathroomFloorRemodel" | "bathroomRemodel" | "camera";
type BathroomRemodelRoute = "bathroomFloorRemodel" |  "enhanceBathroom";
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
        bathroomFloor: null,
        bathOrShowerWall: null,
        bathroomWall: null,
        bathroomCeiling: null,
        floorOrWallOrCeilingRepairs: null,
      },
    })
  }, []);
  const validationSchema = React.useMemo(() => yup.object().shape({
    zipCode: yup.string().required('Zip Code is Required').max(5),
    maintainFloor: yup.string().required('Maintain Floor is Required'),
    enhanceBathroom: yup.string().required('Enhance Bathroom is Required'),
    bathroomRemodel: yup.object().shape({
      bathtub: yup.number().positive('Bathtub answer is Required'),
      showerStall: yup.number().positive('Shower Stall answer is Required'),
      toilet: yup.number().positive('Toilet answer is Required'),
      sink: yup.number().positive('Sink answer is Required'),
      vanity: yup.number().positive('Vanity answer is Required'),
      medicineCabinet: yup.number().positive('Medicine Cabinet answer is Required'),
      mirror: yup.number().positive('Mirror answer is Required'),
      fiberGlassShowerDoor: yup.number().positive('Fiber Glass Shower Door answer is Required'),
    }),
    bathroomFloorRemodel: yup.object().shape({
      bathroomFloor: yup.number().positive('Bathroom Floor answer is Required'),
      bathOrShowerWall: yup.number().positive('Bath/Shower Wall answer is Required'),
      bathroomWall: yup.number().positive('Bathroom Wall answer is Required'),
      bathroomCeiling: yup.number().positive('Bathroom Ceiling answer is Required'),
      floorOrWallOrCeilingRepairs: yup.number().positive('Floor/Wall/Ceiling Repairs answer is Required'),
    }),
  }), []);

  const onSubmit = React.useCallback(values => {
    console.log("BathroomRemodelForm onsubmit vaues", values);
    navigation.navigate("CameraScreen");
  }, []);

  const { navigation } = props;
  const remodelType = navigation.getParam("remodelType", "bathroomRemodel");
  const step = navigation.getParam("step", "zipCode");
  const backFrom = navigation.getParam("backFrom", null);

  const handleStepNavigation = React.useCallback<BathroomRemodelFormProps['handleStepNavigation']>((nextStep) => {
    const route = step === "bathroomFloorRemodel" || step === "enhanceBathroom" ? step : "";
    if (nextStep === "camera") {
      navigation.navigate("CameraScreen");
    } else {
      navigation.navigate("BathroomRemodelFormScreen", { route, backFrom: "", step: nextStep, previousStep: step });
    };
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
          <BathroomRemodel backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
      </View>
    </BathroomRemodelFormik>
  )
};

export default React.memo(BathroomRemodelForm);