import _ from 'lodash';
import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import BedroomSize from '../BedroomSize';
import ContactPhoneNumber from '../ContactPhoneNumber';
import FullBathSize from '../FullBathSize';
import HalfBathSize from '../HalfBathSize';
import KitchenCabinetSize from '../KitchenCabinetSize';
import FiximizeQuestionsFormik from '../../../components/FiximizeQuestions/FiximizeQuestionsFormik';
import ThreeQuarterBathSize from '../ThreeQuarterBathSize';
import VacantProperty from '../VacantProperty';
import { CreateRehab, CreateRehabVariables } from '../../../generated/CreateRehab';

import { FiximizeFlow } from '../../Autocomplete';

type FiximizeQuestionsStepForBeds = "beds1" | "beds2" | "beds3" |"beds4" |"beds5";
type FiximizeQuestionsStepForFullBaths = "fullBaths1" | "fullBaths2" | "fullBaths3" |"fullBaths4" |"fullBaths5";
type FiximizeQuestionsStepForThreeQuarterBaths = "threeQuarterBaths1" | "threeQuarterBaths2" | "threeQuarterBaths3" |"threeQuarterBaths4" |"threeQuarterBaths5";
type FiximizeQuestionsStepForHalfBaths = "halfBaths1" | "halfBaths2" | "halfBaths3" |"halfBaths4" |"halfBaths5";

type FiximizeQuestionsStep = FiximizeQuestionsStepForBeds | FiximizeQuestionsStepForFullBaths | FiximizeQuestionsStepForThreeQuarterBaths | FiximizeQuestionsStepForHalfBaths |
  "halfBathSize" | "kitchenWallCabinetSize" | "kitchenBaseCabinetSize" | "kitchenIslandCabinetSize" | "vacant";

type Params = {
  arvEstimate?: number;
  asIsEstimate: number;
  totalDebts: number;
  step: FiximizeQuestionsStep;
  flow?: FiximizeFlow;
  address?: string;
  postalCode?: string;
  backFrom?: FiximizeQuestionsStep;
  // TODO type
  initialValues?: object;
  previousStep?: FiximizeQuestionsStep;
  propertyInfo?: object;
};

type ScreenProps = {};

const FiximizeQuestionsPreviousStepMap = {
  // "kitchenWallCabinetSize": "asIsEstimate",
  "kitchenBaseCabinetSize": "kitchenWallCabinetSize",
  "kitchenIslandCabinetSize": "kitchenBaseCabinetSize",
  "vacant": "kitchenIslandCabinetSize",
  // "contactPhoneNumber": "vacant",
};

export const RequiredInput = ["beds", "fullBaths", "halfBaths", "threeQuarterBaths"];

export const getPreviousStep = (currentstep: FiximizeQuestionsStep, propertyInfo: any) => {
  // PreviousSteps for beds, fullBaths, threeQuarterBaths and halfBaths
  if (FiximizeQuestionsPreviousStepMap[currentstep]) {
    return FiximizeQuestionsPreviousStepMap[currentstep];
  } else if (currentstep.includes("beds")) {
    // TODO either here or navigator back to property info screen
    if (currentstep.slice(-1) === "1") {
      return "PropertyInfoScreen";
    } else {
      const previousIndex = +currentstep.slice(-1) - 1;
      return "beds" + previousIndex;
    }
  } else if (currentstep.includes("fullBaths")) {
    if (currentstep.slice(-1) === "1") {
      return `beds${propertyInfo.beds}`;
    } else {
      const previousIndex = +currentstep.slice(-1) - 1;
      return "fullBaths" + previousIndex;
    }
  } else if (currentstep.includes("threeQuarterBaths")) {
    if (currentstep.slice(-1) === "1") {
      return `fullBaths${propertyInfo.fullBaths}`;
    } else {
      const previousIndex = +currentstep.slice(-1) - 1;
      return "threeQuarterBaths" + previousIndex;
    }
  } else if (currentstep.includes("halfBaths")) {
    if (currentstep.slice(-1) === "1") {
      return `threeQuarterBaths${propertyInfo.threeQuarterBaths}`;
    } else {
      const previousIndex = +currentstep.slice(-1) - 1;
      return "halfBaths" + previousIndex;
    }
  } else if (currentstep === "kitchenWallCabinetSize") {
    if (propertyInfo.halfBaths) {
      return `halfBaths${propertyInfo.halfBaths}`;
    } else if (propertyInfo.threeQuarterBaths) {
      return `threeQuarterBaths${propertyInfo.threeQuarterBaths}`;
    } else {
      return `fullBaths${propertyInfo.fullBaths}`;
    }
  }
};

export interface FiximizeQuestionsFormValues {
  asIsEstimate: number;
  // contactPhoneNumber: string;
  vacant: number;
};

export interface FiximizeQuestionsFormProps {
  backFrom: FiximizeQuestionsStep;
  handleStepNavigation: (step: FiximizeQuestionsStep, options?: any) => void;
}

const FiximizeQuestionsForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation, screenProps } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const address = navigation.getParam("address", "");
  const postalCode = navigation.getParam("postalCode", null);
  const arvEstimate = navigation.getParam("arvEstimate", null);
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const totalDebts = navigation.getParam("totalDebts", null);
  const formInitialValues = navigation.getParam("initialValues", {});
  const propertyInfo = navigation.getParam("propertyInfo", {});
  const step = navigation.getParam("step", "vacant");
  const flow = navigation.getParam("flow");

  const initialValues = React.useMemo(() => {
    return ({
      asIsEstimate,
      // contactPhoneNumber: "",
      kitchenWallCabinetSize: "0",
      kitchenBaseCabinetSize: "0",
      kitchenIslandCabinetSize: "0",
      vacant: 1,
      ...formInitialValues,
    })
  }, [asIsEstimate, formInitialValues]);

  const validationSchema = React.useMemo(() => {
    let shape = {};
    for (let [key] of Object.entries(initialValues)) {
      if (RequiredInput.includes(key)) {
        const nestedShape = _.mapValues(initialValues[key], () => {
          return yup.string().required('This Field is Required');
        });
        shape[key] = yup.object().shape({
          ...nestedShape
        })
      } else {
        shape[key] = yup.string().required('This Field is Required');
      }
    }
    return yup.object().shape({
      ...shape
    })
  }, [initialValues]);

  const onSubmit = React.useCallback(values => {
    const { asIsEstimate, beds, fullBaths, halfBaths, threeQuarterBaths,
      kitchenBaseCabinetSize, kitchenIslandCabinetSize, kitchenWallCabinetSize, vacant } = values;
    const bedsInfo = _.map(beds, (value, key) => {
      return { size: +value, order: +key[key.length - 1]};
    });
    const fullBathsInfo = _.map(fullBaths, (value, key) => {
      return { size: +value, order: +key[key.length - 1]};
    });
    const halfBathsInfo = _.map(halfBaths, (value, key) => {
      return { size: +value, order: +key[key.length - 1]};
    });
    const threeQuarterBathsInfo = _.map(threeQuarterBaths, (value, key) => {
      return { size: +value, order: +key[key.length - 1]};
    });
    const createRehabInput: CreateRehabVariables['input'] = {
      address,
      // contactPhoneNumber,
      asIs: +asIsEstimate,
      propertyDetails: {
        bedsInfo,
        fullBathsInfo,
        halfBathsInfo,
        kitchenCabinetBaseLength: +kitchenBaseCabinetSize,
        kitchenCabinetIslandLength: +kitchenIslandCabinetSize,
        kitchenCabinetUpperLength: +kitchenWallCabinetSize,
        threeQuarterBathsInfo,
      },
      totalDebts: +totalDebts,
      vacant: !!vacant,
    };
    // navigation.navigate("FullRemodelSummaryScreen", { flow, createRehabInput, createRehabNoArvInput: { ...createRehabInput, ...propertyInfo, postalCode, arv: arvEstimate} });
    navigation.navigate("ContactPhoneNumberScreen", { flow, createRehabInput, createRehabNoArvInput: { ...createRehabInput, ...propertyInfo, postalCode, arv: arvEstimate} });
  }, []);

  const kitchenCabinetSizefields = React.useMemo(() => {
    return [
      { name: "kitchenWallCabinetSize", description: "Wall", nextItem: "kitchenBaseCabinetSize"},
      { name: "kitchenBaseCabinetSize", description: "Base", nextItem: "kitchenIslandCabinetSize"},
      { name: "kitchenIslandCabinetSize", description: "Island", nextItem: "vacant"},
    ]
  }, []);

  const bedroomSizefields = React.useMemo(() => {
    let result = [];
    _.forEach(initialValues["beds"], (value, key) => {
      const index = Number(key.length - 1);
      const order = Number(key[index]);
      result.push({
        name: key, description: order, nextItem: order === propertyInfo["beds"] ? "fullBaths1" : key.slice(0, -1).concat(`${order + 1}`)
      })
    })
    return result;
  }, [initialValues]);

  const fullBathSizefields = React.useMemo(() => {
    let result = [];
    _.forEach(initialValues["fullBaths"], (value, key) => {
      const index = Number(key.length - 1);
      const order = Number(key[index]);
      const nextStep = !(order === propertyInfo["fullBaths"]) ? key.slice(0, -1).concat(`${order + 1}`) :
      propertyInfo["threeQuarterBaths"] >= 1 ? "threeQuarterBaths1" : 
      propertyInfo["halfBaths"] >= 1 ? "halfBaths1" :
      "kitchenWallCabinetSize";
      result.push({
        name: key, 
        description: order, 
        // If no 3/4 bath then half bath, if no half bath then as is
        nextItem: nextStep,
      })
    })
    return result;
  }, [initialValues]);

  const halfBathSizefields = React.useMemo(() => {
    let result = [];
    _.forEach(initialValues["halfBaths"], (value, key) => {
      const index = Number(key.length - 1);
      const order = Number(key[index]);
      const nextStep = !(order === propertyInfo["halfBaths"]) ? key.slice(0, -1).concat(`${order + 1}`) :
      "kitchenWallCabinetSize";
      result.push({
        name: key, description: order, nextItem: nextStep
      })
    })
    return result;
  }, [initialValues]);

  const threeQuarterBathSizefields = React.useMemo(() => {
    let result = [];

    _.forEach(initialValues["threeQuarterBaths"], (value, key) => {
      const index = Number(key.length - 1);
      const order = Number(key[index]);
      const nextStep = !(order === propertyInfo["threeQuarterBaths"]) ? key.slice(0, -1).concat(`${order + 1}`) :
      propertyInfo["halfBaths"] >= 1 ? "halfBaths1" :
      "kitchenWallCabinetSize";

      result.push({
        name: key, description: order, nextItem: nextStep
      })
    })
    return result;
  }, [initialValues]);

  const handleStepNavigation = React.useCallback<FiximizeQuestionsFormProps['handleStepNavigation']>((nextStep, options = {}) => {
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
        {/* {bedroomSizefields.map((item) => {
          return step === item.name ? 
            <BedroomSize backFrom={backFrom} field={item} key={item.name} handleStepNavigation={handleStepNavigation} />
            : null
        })}
        {fullBathSizefields.map((item) => {
          return step === item.name ? 
            <FullBathSize backFrom={backFrom} field={item} key={item.name} handleStepNavigation={handleStepNavigation} />
            : null
        })}
        {halfBathSizefields.map((item) => {
          return step === item.name ? 
            <HalfBathSize backFrom={backFrom} field={item} key={item.name} handleStepNavigation={handleStepNavigation} />
            : null
        })}
        {threeQuarterBathSizefields.map((item) => {
          return step === item.name ? 
            <ThreeQuarterBathSize backFrom={backFrom} field={item} key={item.name} handleStepNavigation={handleStepNavigation} />
            : null
        })}
        {kitchenCabinetSizefields.map((item) => {
          return step === item.name ? 
            <KitchenCabinetSize backFrom={backFrom} field={item} key={item.name} handleStepNavigation={handleStepNavigation} />
            : null
        })} */}
        {step === "vacant" ? 
          <VacantProperty backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {/* {step === "contactPhoneNumber" ? 
          <ContactPhoneNumber backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        } */}
      </View>
    </FiximizeQuestionsFormik>
  )
};

export default React.memo(FiximizeQuestionsForm);