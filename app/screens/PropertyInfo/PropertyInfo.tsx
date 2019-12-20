import { gql } from 'apollo-boost';
import { startCase } from 'lodash';
import React from 'react';
import { ActivityIndicator, StatusBar, ScrollView, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import styles from './styles';
import { RequiredInput } from '../FiximizeQuestions/FiximizeQuestionsForm';

type Params = { 
  address: string;
  asIsEstimate: number;
  totalDebts: number;
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

const propertyInfoForTesting = {
  "beds": 3,
  "sqft": 1801,
  "fullBaths": 1,
  "threeQuarterBaths": 1,
  "halfBaths": 1,
  "mlsNumber": "939978",
  "style": "32 - Townhouse"
};

const PropertyInfo: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [dataArray, setDataArray] = React.useState([]);
  const [fiximizeQuestionsFormInitialValues, setFiximizeQuestionsFormInitialValues] = React.useState(null);
  const address = navigation.getParam("address", "");
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const totalDebts = navigation.getParam("totalDebts", null);
  const { data, error, loading } = useQuery(PROPERTY_INFO, {
    variables: { query: { address: address }}
  });

  const bootstrapAsync = () => {
    let arr = [];
    let inputValues = {};
    if (!error && data && data.propertyInfo) {
      for (let [key, value] of Object.entries(data.propertyInfo)) {
        if (key !== "__typename") {
          arr.push({ value, name: key });
        };
        if (RequiredInput.includes(key)) {
          for (let i = 0 ; i < value; i++) {
            inputValues[key] = {
              ...inputValues[key],
              [`${key}${i+1}`]: 
                key === "beds" ? "132" : 
                key === "fullBaths" ? "60" :
                key === "threeQuarterBaths" ? "40" :
                key === "halfBaths" ? "20" :
                "0",
            };
          }
        }
      }
      setDataArray(arr);
      setFiximizeQuestionsFormInitialValues({...inputValues});
    };
  };
  
  const handleOnPress = React.useCallback(() => {
    navigation.navigate("FiximizeQuestionsFormScreen", { address, asIsEstimate, totalDebts, initialValues: fiximizeQuestionsFormInitialValues, propertyInfo: data.propertyInfo, step: "beds1" });
  }, [address, data, fiximizeQuestionsFormInitialValues]);

  React.useEffect(() => {
    console.log("PropertyInfo Mount");
    bootstrapAsync();
    return () => {console.log("PropertyInfo UnMount")}
  }, [data]);

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
    </ScrollView>
  )
};

export default React.memo(PropertyInfo);