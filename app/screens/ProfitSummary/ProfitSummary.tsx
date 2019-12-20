import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Banner, BannerAction, Button, ButtonProps } from 'react-native-paper';
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
  submitted: boolean;
  totalDebts: number;
  vacant: boolean;
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

const checkIsQualified = (args: {
  arv: number;
  asIs: number;
  remodellingCost: number;
  totalDebts: number;
  vacant: boolean;
}) => {
  const { arv, asIs, remodellingCost, totalDebts, vacant } = args;
  // console.log("checkIsQualified fields arv, asIs, remodellingCost, totalDebts, vacant\n", arv, asIs, remodellingCost, totalDebts, vacant);
  let bannerMessagesArr = [];
  let isQualified = true;
  // First gate: 
  if (asIs + remodellingCost >= arv) {
    isQualified = false;
    bannerMessagesArr.push("- The sum of As-IS and Remodeling Cost is not smaller than Est. ARV!");
  } // Second gate:
  else if (totalDebts + remodellingCost >= arv * 0.8 ) {
    isQualified = false;
    bannerMessagesArr.push("- The sum of Total Debts and Remodeling Cost is not smaller than 80% of Est. ARV!");
  } // Third gate:
  else if (!vacant) {
    isQualified = false;
    bannerMessagesArr.push("- The property is not vacant!");
  };
  isQualified ? bannerMessagesArr.push("Qualified! Feel free to submit!") : bannerMessagesArr.unshift("Unqualified! Please check the reasons below: ");
  const bannerMessages = bannerMessagesArr.join("\n");
  console.log("checkIsQualified bannerMessages",bannerMessages)
  return { bannerMessages, isQualified };
};

const ProfitSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [updateRehabItemsPackage] = useMutation(UPDATE_REHAB_ITEMS_PACKAGE);
  const arv = navigation.getParam("arv", 0);
  const asIs = navigation.getParam("asIs", 0);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemsPackage = navigation.getParam("rehabItemPackage", {});
  const remodellingCost = navigation.getParam("remodellingCost", 0);
  const step = navigation.getParam("step", "summary");
  const totalDebts = navigation.getParam("totalDebts", null);
  const vacant = navigation.getParam("vacant", null);

  const [bannerMessages, setBannerMessages] = React.useState(checkIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).bannerMessages);
  const [isQualified, setIsQualified] = React.useState(checkIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).isQualified);
  const [hasBanner, setHasBanner] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(navigation.getParam("submitted", false));
  const [status, setStatus] = React.useState("");
  const profit = React.useMemo(() => {
    return +(arv - asIs - remodellingCost);
  }, [arv, asIs, remodellingCost]);
  const data = [
    { name: "Est. ARV", value: arv },
    { name: "As-Is", value: asIs },
    { name: "Remodeling Cost", value: remodellingCost },
    { name: "Total Debts", value: totalDebts },
    { name: "Vacant", icon: vacant ? "check" : "close", color: vacant ? '#43a048' : '#e53935'},
  ];

  const profitPercent = React.useMemo(() => {
    return profit / remodellingCost * 100;
  },[profit, remodellingCost]);

  const handleBannerButtonOnClick = React.useCallback<BannerAction['onPress']>(() => setHasBanner(false), []);

  const handleSaveOnPress = async () => {
    const updateRehabItemsPackageInput = {
      rehabItemsPackage,
      rehabRequest: {
        arv,
        asIs,
        id: rehabId,
      }
    };
    try {
      setLoading(true);
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      if (result) {
        setStatus("Updated Successfully!");
        setLoading(false);
      }

    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
      setLoading(false);
    }
  };

  const handleSubmitOnPress = async () => {
    setLoading(true);
    const updateRehabItemsPackageInput = {
      rehabItemsPackage: { ...rehabItemsPackage, selected: true, submitted: true },
      rehabRequest: {
        arv,
        asIs,
        id: rehabId,
      }
    };
    try {
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      if (result) {
        setStatus("Submitted Successfully!");
        setSubmitted(true);
        navigation.setParams({ submitted: true });
        setLoading(false);
      }
    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
      setLoading(false);
    }
  };

  const handleStepNavigation = React.useCallback((nextStep, options = {}) => {
    navigation.navigate("ProfitSummaryScreen", { submitted, step: nextStep, ...options });
    options && navigation.setParams({ submitted, ...options });
  }, [step, submitted]);

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
          bannerMessages={bannerMessages}
          data={data}
          handleBannerButtonOnClick={handleBannerButtonOnClick}
          handleSaveOnPress={handleSaveOnPress}
          handleSubmitOnPress={handleSubmitOnPress}
          handleStepNavigation={handleStepNavigation}
          hasBanner={hasBanner}
          isQualified={isQualified}
          profit={profit}
          profitPercent={profitPercent}
          status={status}
          submitted={submitted}
        />
      }
      
    </>
  )
};

export default React.memo(ProfitSummary);