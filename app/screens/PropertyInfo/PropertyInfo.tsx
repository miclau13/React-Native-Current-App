import { gql } from 'apollo-boost';
import { startCase, isNil } from 'lodash';
import React from 'react';
import { ActivityIndicator, StatusBar, ScrollView, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useLazyQuery } from '@apollo/react-hooks';

import styles from './styles';
import { RequiredInput } from '../FiximizeQuestions/FiximizeQuestionsForm';
import { FiximizeFlow } from '../FiximizeQuestions/Autocomplete';

import PropertyInfoAdjustment from '../PropertyInfoAdjustment'

type Params = { 
  flow: FiximizeFlow;
  address: string;
  postalCode?: string;
  arvEstimate?: string;
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
  const [dataArray, setDataArray] = React.useState([]);
  const [fiximizeQuestionsFormInitialValues, setFiximizeQuestionsFormInitialValues] = React.useState(null);
  const flow = navigation.getParam("flow");
  const address = navigation.getParam("address", "");
  const postalCode = navigation.getParam("postalCode", null);
  const arvEstimate = navigation.getParam("arvEstimate", null);
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const totalDebts = navigation.getParam("totalDebts", null);
  const beds = navigation.getParam("beds", 1);
  const sqft = navigation.getParam("sqft", 1);
  const fullBaths = navigation.getParam("fullBaths", 1);
  const threeQuarterBaths = navigation.getParam("threeQuarterBaths", 0);
  const halfBaths = navigation.getParam("halfBaths", 0);
  const [style, setStyle] = React.useState(null)
  let inputValues = {};

  const prepareFiximizeQuestionsFormInitialValues = (arr: any[]) => {
    arr.map(item => {
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
    setFiximizeQuestionsFormInitialValues({...inputValues});
  }

  const [getPropertyInfo, { data, error, loading }] = useLazyQuery(PROPERTY_INFO, { onCompleted: (data) => {
    const arr = [];
    if (!error && data && data.propertyInfo) {
      for (let [key, value] of Object.entries(data.propertyInfo)) {
        if (key !== "__typename") {
          arr.push({ value, name: key });
        };
      }
    }
    setStyle(data.propertyInfo['style']);
    setDataArray(arr);
    prepareFiximizeQuestionsFormInitialValues(arr);
  }});
  const step = navigation.getParam("step", 'summary');
  const bootstrapAsync = () => {
    let arr: { name: string, value: any}[] = [];
    if (beds) arr.push({ name: 'beds', value: beds })
    if (sqft) arr.push({ name: 'sqft', value: sqft })
    if (fullBaths) arr.push({ name: 'fullBaths', value: fullBaths})
    if (!isNil(threeQuarterBaths)) arr.push({ name: 'threeQuarterBaths', value: threeQuarterBaths })
    if (!isNil(halfBaths)) arr.push({ name: 'halfBaths', value: halfBaths })
    if (style !== null) arr.push({ name: 'style', value: style });
    setDataArray(arr);
    prepareFiximizeQuestionsFormInitialValues(arr);
  };

  const handleOnPress = React.useCallback(() => {
    navigation.navigate("FiximizeQuestionsFormScreen", 
    { 
      flow,
      address,
      postalCode,
      arvEstimate,
      asIsEstimate, 
      totalDebts, 
      initialValues: fiximizeQuestionsFormInitialValues, 
      propertyInfo: (data && data.propertyInfo) || 
        {
          beds,
          sqft,
          fullBaths,
          threeQuarterBaths,
          halfBaths 
        }, 
      step: "beds1" });
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
    console.log("PropertyInfo Mount");
    bootstrapAsync();
    return () => {console.log("PropertyInfo UnMount")}
  }, [beds, sqft, fullBaths, threeQuarterBaths, halfBaths]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  };

  return (
    <ScrollView>
      {
        step === 'summary' ?
        (
          <>
            <Card title="Property Info">
              {
                dataArray.map(item => (
                  <ListItem
                    bottomDivider
                    key={item.name}
                    title={startCase(item.name)}
                    rightTitle={`${item.value}`}
                  />
                ))
              } 
            </Card>
            <Button
              mode="contained" 
              onPress={handleOnPress}
              style={styles.buttonContainer}
            >
              {"Continue"}
            </Button>
          </>
        )
        :
        (
          <PropertyInfoAdjustment 
            beds={(dataArray.find(data => data.name === 'beds'))?.value ?? beds}
            sqft={(dataArray.find(data => data.name === 'sqft'))?.value ?? sqft}
            fullBaths={(dataArray.find(data => data.name === 'fullBaths'))?.value ?? fullBaths}
            threeQuarterBaths={(dataArray.find(data => data.name === 'threeQuarterBaths'))?.value ?? threeQuarterBaths}
            halfBaths={(dataArray.find(data => data.name === 'halfBaths'))?.value ?? halfBaths}
            handleStepNavigation={handleStepNavigation}
          />
        )
      }
      
    </ScrollView>
  )
};

export default React.memo(PropertyInfo);