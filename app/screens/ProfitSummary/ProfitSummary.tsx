import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button, ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import NumberFormat from 'react-number-format';

// import { useMutation } from '@apollo/react-hooks';
import ProfitSummaryView from './ProfitSummaryView';
import Speedometer from './ProfitSummarySpeedometerChart';
import styles from './styles';
import ProfitAdjustment from '../ProfitAdjustment';

type Params = {
  arv: number;
  asIs: number;
  remodellingCost: number;
  step: string;
};

type ScreenProps = {};

// const CREATE_REHAB = gql`
//   mutation CreateRehab($input: CreateRehabInput!) {
//     createRehab(input: $input) {
//       arv
//       rehabItemPackage {
//         rehabItems {
//           category
//           cost
//           name
//         }
//       }
//     }
//   }
// `;

const ProfitSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  // const [createRehab] = useMutation(CREATE_REHAB);
  // const createRehabInput = navigation.getParam("createRehabInput", null);
  const asIs = navigation.getParam("asIs", 0);
  const remodellingCost = navigation.getParam("remodellingCost", 0);
  const step = navigation.getParam("step", "summary");
  const [arv, setArv] = React.useState(navigation.getParam("arv", 0));
  const profit = React.useMemo(() => {
    return +(arv - asIs - remodellingCost);
  }, [arv, asIs, remodellingCost]);
  const [data, setData] = React.useState([
    { name: "Est. ARV", value: arv },
    { name: "As-Is", value: asIs },
    { name: "Remodelling Cost", value: remodellingCost },
  ]);

  const profitPercent = React.useMemo(() => {
    return profit / asIs * 100;
  },[profit, asIs]);

  const handleStepNavigation = React.useCallback((nextStep, options = {}) => {
    navigation.navigate("ProfitSummaryScreen", { step: nextStep, ...options });
  }, [step]);

  console.log("arv", arv, "asIs", asIs,"remodellingCost", remodellingCost, "profitPercent", profitPercent)

  const bootstrapAsync = async () => {
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <>
      {step === "edit" ?
        <ProfitAdjustment 
          arv={arv}
          setArv={setArv}
          handleStepNavigation={handleStepNavigation}
        />
        :
        <ProfitSummaryView
          data={data}
          handleStepNavigation={handleStepNavigation}
          profit={profit}
          profitPercent={profitPercent}
        />
      }
      
    </>
  )
};

export default React.memo(ProfitSummary);