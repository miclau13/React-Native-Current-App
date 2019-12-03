import _ from 'lodash';
import React from 'react';
import { View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import * as yup from 'yup';

import styles from './styles';
import AsIsEstimate from '../AsIsEstimate';
import BedroomSize from '../BedroomSize';
import FullBathSize from '../FullBathSize';
import HalfBathSize from '../HalfBathSize';
import KitchenCabinetSize from '../KitchenCabinetSize';
import FiximizeQuestionsFormik from '../../../components/FiximizeQuestions/FiximizeQuestionsFormik';
import ThreeQuarterBathSize from '../ThreeQuarterBathSize';

type FiximizeQuestionsStep = "asIsEstimate" | "halfBathSize" | "kitchenWallCabinetSize" | "kitchenBaseCabinetSize" | "kitchenIslandCabinetSize";

type Params = {
  step: FiximizeQuestionsStep;
  address?: string;
  backFrom?: FiximizeQuestionsStep;
  initialValues?: object;
  previousStep?: FiximizeQuestionsStep;
  propertyInfo?: object;
};

type ScreenProps = {};

const FiximizeQuestionsPreviousStepMap = {
  "asIsEstimate": "address",
  "halfBathSize": "asIsEstimate",
};

export const RequiredInput = ["beds", "fullBaths", "halfBaths", "threeQuarterBaths"];

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
  asIsEstimate: string;
};

export interface FiximizeQuestionsFormProps {
  backFrom: FiximizeQuestionsStep;
  handleStepNavigation: (step: FiximizeQuestionsStep, options?: any) => void;
}

const FiximizeQuestionsForm: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const backFrom = navigation.getParam("backFrom", null);
  const address = navigation.getParam("address", "");
  const formInitialValues = navigation.getParam("initialValues", {});
  const propertyInfo = navigation.getParam("propertyInfo", {});
  const step = navigation.getParam("step", "beds1");

  const initialValues = React.useMemo(() => {
    return ({
      asIsEstimate: "",
      kitchenWallCabinetSize: "",
      kitchenBaseCabinetSize: "",
      kitchenIslandCabinetSize: "",
      ...formInitialValues,
    })
  }, [formInitialValues]);

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
    // console.log("FiximizeQuestionsForm onsubmit vaues", values);
    const { asIsEstimate, beds, fullBaths, halfBaths, threeQuarterBaths,
      kitchenBaseCabinetSize, kitchenIslandCabinetSize, kitchenWallCabinetSize, } = values;
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
    const createRehabInput = {
      address: address || "13807 SE Allen Rd, Bellevue, WA, 98006",
      asIs: +asIsEstimate,
      propertyDetails: {
        bedsInfo,
        fullBathsInfo,
        halfBathsInfo,
        kitchenCabinetBaseLength: +kitchenBaseCabinetSize,
        kitchenCabinetIslandLength: +kitchenIslandCabinetSize,
        kitchenCabinetUpperLength: +kitchenWallCabinetSize,
        threeQuarterBathsInfo,
      }
    };
    navigation.navigate("FullRemodelSummaryScreen", { createRehabInput });
  }, []);

  const kitchenCabinetSizefields = React.useMemo(() => {
    return [
      { name: "kitchenWallCabinetSize", description: "Wall", nextItem: "kitchenBaseCabinetSize"},
      { name: "kitchenBaseCabinetSize", description: "Base", nextItem: "kitchenIslandCabinetSize"},
      { name: "kitchenIslandCabinetSize", description: "Island", nextItem: ""},
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
      const nextStep = !order === propertyInfo["fullBaths"] ? key.slice(0, -1).concat(`${order + 1}`) :
      propertyInfo["threeQuarterBaths"] >= 1 ? "threeQuarterBaths1" : 
      propertyInfo["halfBaths"] >= 1 ? "halfBaths1" :
      "asIsEstimate";

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
      const nextStep = !order === propertyInfo["halfBaths"] ? key.slice(0, -1).concat(`${order + 1}`) :
      "asIsEstimate";
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
      const nextStep = !order === propertyInfo["threeQuarterBaths"] ? key.slice(0, -1).concat(`${order + 1}`) :
      propertyInfo["halfBaths"] >= 1 ? "halfBaths1" :
      "asIsEstimate";

      result.push({
        name: key, description: order, nextItem: nextStep
      })
    })
    return result;
  }, [initialValues]);

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
        {step === "asIsEstimate" ? 
          <AsIsEstimate backFrom={backFrom} handleStepNavigation={handleStepNavigation} />
          : null
        }
        {bedroomSizefields.map((item) => {
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
        })}
        {/* {step === "kitchenWallCabinetSize" ? 
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
        } */}
      </View>
    </FiximizeQuestionsFormik>
  )
};

export default React.memo(FiximizeQuestionsForm);