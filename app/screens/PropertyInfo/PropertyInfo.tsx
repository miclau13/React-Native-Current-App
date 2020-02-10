import { gql } from 'apollo-boost';
import { isNil, omit, transform } from 'lodash';
import React from 'react';
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useLazyQuery } from '@apollo/react-hooks';

import PropertyInfoView from './PropertyInfoView';
import { getDefaultPropertyDetails } from './utils';
import { RequiredInput } from '../FiximizeQuestions/FiximizeQuestionsForm';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';
import PropertyInfoAdjustment from '../PropertyInfoAdjustment';
import { LoadingComponent } from '../InitialLoading';
import { PropertyInfo as PropertyInfoData, PropertyInfo_propertyInfo } from '../../generated/PropertyInfo';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = { 
  flow: FiximizeFlow;
  address: string;
  postalCode?: string;
  arvEstimate: number;
  asIsEstimate: number;
  totalDebts: number;
  beds?: number;
  sqft?: number;
  fullBaths?: number;
  threeQuarterBaths?: number;
  halfBaths?: number;
  step?: string;
};

type ScreenProps = {};

type PropertyData = {
  name: keyof PropertyInfo_propertyInfo;
  value: any;
};

export interface PropertyInfoViewProps {
  dataArray: PropertyData[];
  handleButtonContinueOnPress: ButtonProps['onPress'];
};

const PROPERTY_INFO = gql`
  query PropertyInfo($query: PropertyInfoQuery!) {
    propertyInfo(query: $query) {
      beds
      sqft
      fullBaths
      threeQuarterBaths
      halfBaths
      style
    }
  }
`;
const PropertyInfo: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const [dataArray, setDataArray] = React.useState<PropertyInfoViewProps['dataArray']>([]);
  const [fiximizeQuestionsFormInitialValues, setFiximizeQuestionsFormInitialValues] = React.useState(null);

  const address = navigation.getParam("address", "");
  const arvEstimate = navigation.getParam("arvEstimate", null);
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const beds = navigation.getParam("beds", null);
  const halfBaths = navigation.getParam("halfBaths", null);
  const flow = navigation.getParam("flow");
  const fullBaths = navigation.getParam("fullBaths", null);
  const postalCode = navigation.getParam("postalCode", null);
  const sqft = navigation.getParam("sqft", null);
  const step = navigation.getParam("step", 'summary');
  const threeQuarterBaths = navigation.getParam("threeQuarterBaths", null);
  const totalDebts = navigation.getParam("totalDebts", null);

  const [getPropertyInfo, { data, error, loading }] = useLazyQuery<PropertyInfoData>(PROPERTY_INFO, { onCompleted: (data) => {
    let arr: PropertyData[] = [];
    if (!error && data && data.propertyInfo) {
      arr = transform(omit(data.propertyInfo, ["__typename"]), (result, value, key) => {
        result.push({ value, name: key });
      }, []);
    };
    setDataArray(arr);
    prepareFiximizeQuestionsFormInitialValues(arr);
  }});

  const prepareFiximizeQuestionsFormInitialValues = (propertyDataArr: PropertyData[]) => {
    let inputValues = {};
    propertyDataArr.map(item => {
      if (RequiredInput.includes(item.name)) {
        for (let i = 0 ; i < item.value; i++) {
          inputValues[item.name] = {
            ...inputValues[item.name],
            [`${item.name}${i+1}`]: 
              item.name === "beds" ? "132" : 
              item.name === "fullBaths" ? "60" :
              item.name === "threeQuarterBaths" ? "40" :
              item.name === "halfBaths" ? "20" :
              "0",
          };
        }
      }
    });
    setFiximizeQuestionsFormInitialValues(inputValues);
  };

  const bootstrapAsync = () => {
    let arr = [];
    if (beds) arr.push({ name: 'beds', value: beds })
    if (sqft) arr.push({ name: 'sqft', value: sqft })
    if (fullBaths) arr.push({ name: 'fullBaths', value: fullBaths})
    if (!isNil(threeQuarterBaths)) arr.push({ name: 'threeQuarterBaths', value: threeQuarterBaths })
    if (!isNil(halfBaths)) arr.push({ name: 'halfBaths', value: halfBaths })
    setDataArray(arr);
    prepareFiximizeQuestionsFormInitialValues(arr);
  };

  const handleButtonContinueOnPress = React.useCallback<PropertyInfoViewProps['handleButtonContinueOnPress']>(() => {
    const propertyInfo = {
      beds: beds || (data?.propertyInfo?.beds),
      sqft: sqft || (data?.propertyInfo?.sqft),
      fullBaths: fullBaths || (data?.propertyInfo?.fullBaths),
      threeQuarterBaths: threeQuarterBaths || (data?.propertyInfo?.threeQuarterBaths),
      halfBaths: halfBaths || (data?.propertyInfo?.halfBaths), 
    };
    const propertyDetails = getDefaultPropertyDetails(fiximizeQuestionsFormInitialValues);
    const createRehabNoArvInput: CreateRehabNoArvVariables['input'] = {
      address,
      postalCode,
      propertyDetails,
      arv: arvEstimate,
      asIs: asIsEstimate,
      totalDebts: totalDebts,
      ...propertyInfo
    };
    navigation.navigate("VacantPropertyScreen", { createRehabNoArvInput });
  }, [address, data, fiximizeQuestionsFormInitialValues]);

  const handleStepNavigation = React.useCallback((nextStep, options={}) => {
    navigation.navigate("PropertyInfoScreen", { step: nextStep, ...options });
  }, [step]);

  React.useEffect(() => {
    if (flow === FiximizeFlow.AutoCompleteAddress && !data) {
      getPropertyInfo({
        variables: { query: { address: address }}
      })
    }
  }, [data]);

  React.useEffect(() => {
    bootstrapAsync();
    return () => {}
  }, [beds, sqft, fullBaths, threeQuarterBaths, halfBaths]);

  if (loading) {
    return (<LoadingComponent />)
  };

  return (
    <>
      {step === 'summary' ?
        <PropertyInfoView 
          dataArray={dataArray}
          handleButtonContinueOnPress={handleButtonContinueOnPress}
        /> :
        <PropertyInfoAdjustment 
          beds={(dataArray.find(data => data.name === 'beds'))?.value ?? beds}
          sqft={(dataArray.find(data => data.name === 'sqft'))?.value ?? sqft}
          fullBaths={(dataArray.find(data => data.name === 'fullBaths'))?.value ?? fullBaths}
          threeQuarterBaths={(dataArray.find(data => data.name === 'threeQuarterBaths'))?.value ?? threeQuarterBaths}
          halfBaths={(dataArray.find(data => data.name === 'halfBaths'))?.value ?? halfBaths}
          handleStepNavigation={handleStepNavigation}
        />
      }
    </>
  )
};

export default React.memo(PropertyInfo);