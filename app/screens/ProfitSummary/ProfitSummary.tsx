import { gql } from 'apollo-boost';
import React from 'react';
import { BannerAction, ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import ProfitSummaryView from './ProfitSummaryView';
import { CheckIsQualified } from './utils';
import { LoadingComponent } from '../InitialLoading';
import { Params as FullRemodelSummaryParams, FullRemodelSummaryProps, FullRemodelSummaryState } from '../FullRemodelSummary';
import ProfitAdjustment from './ProfitAdjustment';
import { UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables } from '../../generated/UpdateRehabItemsPackage';

export type Params = {
  arv: FullRemodelSummaryParams['arv'];
  asIs: FullRemodelSummaryParams['asIs'];
  rehabId: FullRemodelSummaryState['rehabId'];
  rehabItemPackage: {
    id: FullRemodelSummaryState['rehabId'];
    rehabItems: FullRemodelSummaryState['rehabItems'];
  };
  remodellingCost: FullRemodelSummaryProps['totalCost'];
  // TODO enum
  step: string;
  submitted: FullRemodelSummaryParams['submitted'];
  totalDebts: FullRemodelSummaryParams['totalDebts'];
  vacant: FullRemodelSummaryParams['vacant'];
};

type ScreenProps = {};

export type ProfitSummaryProps = {
  bannerIcon: {
    name: string;
    color: string;
  };
  bannerMessages: string;
  data: {
    name: string;
    value?: number;
    icon?: string;
    color?: string;
    lower?: number;
    upper?: number;
  }[];
  handleBannerButtonOnClick: BannerAction['onPress'];
  handleSaveOnPress: ButtonProps['onPress'];
  handleSubmitOnPress: ButtonProps['onPress'];
  handleStepNavigation(nextStep: string, options?: {}): void;
  hasBanner: ProfitSummaryState['hasBanner'];
  isQualified: ProfitSummaryState['isQualified'];
  profit: number;
  upperProfit: number;
  lowerProfit: number;
  profitPercent: number;
  upperProfitPercent: number;
  lowerProfitPercent: number;
  submitted: ProfitSummaryState['submitted'];
  status: ProfitSummaryState['status'];
};

export type ProfitSummaryState = {
  bannerMessages: string;
  isQualified: boolean;
  hasBanner: boolean;
  loading: boolean;
  submitted: boolean;
  status: string;
};

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
  const [updateRehabItemsPackage] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE);

  const { navigation } = props;
  const arv = navigation.getParam("arv", 0);
  const asIs = navigation.getParam("asIs", 0);
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemsPackage = navigation.getParam("rehabItemPackage", null);
  const remodellingCost = navigation.getParam("remodellingCost", 0);
  const step = navigation.getParam("step", "summary");
  const totalDebts = navigation.getParam("totalDebts", null);
  const vacant = navigation.getParam("vacant", null);

  const [bannerMessages, setBannerMessages] = React.useState<ProfitSummaryState['bannerMessages']>(CheckIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).bannerMessages);
  const [isQualified, setIsQualified] = React.useState<ProfitSummaryState['isQualified']>(CheckIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).isQualified);
  const [hasBanner, setHasBanner] = React.useState<ProfitSummaryState['hasBanner']>(!navigation.getParam("submitted", false));
  const [loading, setLoading] = React.useState<ProfitSummaryState['loading']>(false);
  const [submitted, setSubmitted] = React.useState<ProfitSummaryState['submitted']>(navigation.getParam("submitted", false));
  const [status, setStatus] = React.useState<ProfitSummaryState['status']>("");

  const bannerIcon: ProfitSummaryProps['bannerIcon'] = {
    name: isQualified ? "check" : "close", color: isQualified ? '#43a048' : '#e53935'
  };
  const upperRemodellingCost = remodellingCost * 1.6;
  const lowerRemdellingCost = remodellingCost * 0.6
  const data: ProfitSummaryProps['data'] = [
    { name: "Est. ARV", value: arv },
    { name: "As-Is", value: asIs },
    { name: "Remodeling Budget", value: remodellingCost, lower: lowerRemdellingCost, upper: upperRemodellingCost },
    { name: "Total Debts", value: totalDebts },
    { name: "Vacant", icon: vacant ? "check" : "close", color: vacant ? '#43a048' : '#e53935' },
  ];
  const profit = React.useMemo<ProfitSummaryProps['profit']>(() => {
    return +(arv - asIs - remodellingCost);
  }, [arv, asIs, remodellingCost]);
  const upperProfit = React.useMemo<ProfitSummaryProps['profit']>(() => {
    return +(arv - asIs - lowerRemdellingCost);
  }, [arv, asIs, lowerRemdellingCost]);
  const lowerProfit = React.useMemo<ProfitSummaryProps['profit']>(() => {
    return +(arv - asIs - upperRemodellingCost);
  }, [arv, asIs, upperRemodellingCost]);
  const profitPercent = React.useMemo<ProfitSummaryProps['profitPercent']>(() => {
    return profit / remodellingCost * 100;
  },[profit, remodellingCost]);
  const upperProfitPercent = React.useMemo<ProfitSummaryProps['profitPercent']>(() => {
    return upperProfit / lowerRemdellingCost * 100;
  },[upperProfit, lowerRemdellingCost]);
  const lowerProfitPercent = React.useMemo<ProfitSummaryProps['profitPercent']>(() => {
    return lowerProfit / upperRemodellingCost * 100;
  },[lowerProfit, upperRemodellingCost]);
  const handleBannerButtonOnClick = React.useCallback<ProfitSummaryProps['handleBannerButtonOnClick']>(() => setHasBanner(false), [hasBanner]);

  const handleSaveOnPress: ProfitSummaryProps['handleSaveOnPress'] = async () => {
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

  const handleSubmitOnPress: ProfitSummaryProps['handleSubmitOnPress'] = async () => {
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
        setHasBanner(false);
      }
    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
      setLoading(false);
    }
  };

  const handleStepNavigation = React.useCallback<ProfitSummaryProps['handleStepNavigation']>((nextStep, options = {}) => {
    navigation.navigate("ProfitSummaryScreen", { submitted, step: nextStep, ...options });
    options && navigation.setParams({ submitted, ...options });
  }, [step, submitted]);

  React.useEffect(() => {
    // console.log("ProfitSummary Mount");
    return () => {
      // console.log("ProfitSummary UnMount");
    }
  }, []);

  React.useEffect(() => {
    // console.log("ProfitSummary useEffect start update banner");
    setBannerMessages(CheckIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).bannerMessages);
    setIsQualified(CheckIsQualified({ arv, asIs, remodellingCost, totalDebts, vacant }).isQualified);
    return () => {
      // console.log("ProfitSummary useEffect delete update banner");
    }
  }, [arv, asIs, remodellingCost, totalDebts, vacant]);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <>
      {step === "edit" ?
        <ProfitAdjustment 
          arv={arv}
          asIs={asIs}
          handleStepNavigation={handleStepNavigation}
          vacant={vacant}
        />
        :
        <ProfitSummaryView
          bannerIcon={bannerIcon}
          bannerMessages={bannerMessages}
          data={data}
          handleBannerButtonOnClick={handleBannerButtonOnClick}
          handleSaveOnPress={handleSaveOnPress}
          handleSubmitOnPress={handleSubmitOnPress}
          handleStepNavigation={handleStepNavigation}
          hasBanner={hasBanner}
          isQualified={isQualified}
          profit={profit}
          upperProfit={upperProfit}
          lowerProfit={lowerProfit}
          profitPercent={profitPercent}
          upperProfitPercent={upperProfitPercent}
          lowerProfitPercent={lowerProfitPercent}
          status={status}
          submitted={submitted}
        />
      }
      
    </>
  )
};

export default React.memo(ProfitSummary);