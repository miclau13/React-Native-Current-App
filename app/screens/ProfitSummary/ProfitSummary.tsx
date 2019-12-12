import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import ProfitSummaryView from './ProfitSummaryView';
import styles from './styles';
import ProfitAdjustment from '../ProfitAdjustment';

type Params = {
  arv: number;
  asIs: number;
  rehabId: number;
  // TODO type
  rehabItemPackage: object;
  remodellingCost: number;
  step: string;
};

type ScreenProps = {};

const UPDATE_REHAB_ITEMS_PACKAGE = gql`
  mutation UpdateRehabItemsPackage($input: UpdateRehabItemsPackageInput!) {
    updateRehabItemsPackage(input: $input) {
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
        }
      }
      rehabRequest {
        id
        address
        asIs
        arv
      }
    }
  }
`;

const ProfitSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [updateRehabItemsPackage] = useMutation(UPDATE_REHAB_ITEMS_PACKAGE);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemsPackage = navigation.getParam("rehabItemPackage", {});
  const remodellingCost = navigation.getParam("remodellingCost", 0);
  const step = navigation.getParam("step", "summary");
  const arv = navigation.getParam("arv", 0);
  const asIs = navigation.getParam("asIs", 0);

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const profit = React.useMemo(() => {
    return +(arv - asIs - remodellingCost);
  }, [arv, asIs, remodellingCost]);
  const data = [
    { name: "Est. ARV", value: arv },
    { name: "As-Is", value: asIs },
    { name: "Remodeling Cost", value: remodellingCost },
  ];

  const profitPercent = React.useMemo(() => {
    return profit / asIs * 100;
  },[profit, asIs]);

  const handleSaveOnPress = async () => {
    const updateRehabItemsPackageInput = {
      rehabItemsPackage,
      rehabRequest: {
        arv,
        asIs,
        id: rehabId,
      }
    };
    console.log("updateRehabItemsPackageInput",updateRehabItemsPackageInput)
    try {
      setLoading(true);
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      if (result) {
        setStatus("Updated Successfully!")
      }

    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
      setLoading(false);
    }
  };

  const handleSubmitOnPress = async () => {
    setLoading(true);
    const updateRehabItemsPackageInput = {
      rehabItemsPackage,
      rehabRequest: {
        arv,
        asIs,
        id: rehabId,
      }
    };
    try {
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      if (result) {
        setStatus("Submitted Successfully!")
      }
    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
    }
  };

  const handleStepNavigation = React.useCallback((nextStep, options = {}) => {
    navigation.navigate("ProfitSummaryScreen", { step: nextStep, ...options });
    options && navigation.setParams({ ...options });
  }, [step]);

  React.useEffect(() => {
    console.log("ProfitSummary Mount");
    return () => {
      console.log("ProfitSummary UnMount");
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  };

  return (
    <>
      {step === "edit" ?
        <ProfitAdjustment 
          arv={arv}
          asIs={asIs}
          handleStepNavigation={handleStepNavigation}
        />
        :
        <ProfitSummaryView
          data={data}
          handleSaveOnPress={handleSaveOnPress}
          handleSubmitOnPress={handleSubmitOnPress}
          handleStepNavigation={handleStepNavigation}
          profit={profit}
          profitPercent={profitPercent}
          status={status}
        />
      }
      
    </>
  )
};

export default React.memo(ProfitSummary);