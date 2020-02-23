import { gql } from 'apollo-boost';
import React from 'react';
import { ButtonGroupProps } from 'react-native-elements';
import { ModalProps } from 'react-native-modal';
import { BannerAction, ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import ProfitSummaryView from './ProfitSummaryView';
import { LoadingComponent } from '../InitialLoading';
import { Params as FullRemodelSummaryParams, FullRemodelSummaryProps, FullRemodelSummaryState } from '../FullRemodelSummary';
import ProfitAdjustment from './ProfitAdjustment';
import ProfitSummaryEditView from './ProfitSummaryEditView';
import { eraseComma, validateFormat } from '../../components/NumberInput/utils';
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

interface ProfitSummaryEditOnlyFields {
  arv: string;
  asIs: string;
  vacant: number;
};

export interface ProfitSummaryEditViewProps {
  buttonsForVacant: ('NO' | 'YES')[];
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonConfirmOnPress: ButtonProps['onPress'];
  handleButtonGroupVacantOnPress: ButtonGroupProps['onPress'];
  handleOnChangeText: (key: string) => TextInputProps['onChangeText'];
  modalVisible: ModalProps['isVisible'];
  profitSummaryEditOnlyFields: ProfitSummaryEditOnlyFields;
};

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

  const [loading, setLoading] = React.useState<ProfitSummaryState['loading']>(false);
  const [submitted, setSubmitted] = React.useState<ProfitSummaryState['submitted']>(navigation.getParam("submitted", false));

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
        setSubmitted(true);
        navigation.setParams({ submitted: true });
        setLoading(false);
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

    // For ProfitSummaryEditView
    const buttonsForVacant = React.useMemo<ProfitSummaryEditViewProps['buttonsForVacant']>(() => {
      return ['NO', 'YES'];
    }, []);
    const modalVisible = React.useMemo<ProfitSummaryEditViewProps['modalVisible']>(() => {
      return step == 'edit';
    }, [step]);
    const profitSummaryEditOnlyFields = React.useMemo<ProfitSummaryEditViewProps['profitSummaryEditOnlyFields']>(() => {
      // const result = mapValues(omit(propertyInfoFields, ["style"]), value => {
      //   const validValue = validateFormat(value.toString());
      //   return validValue;
      // });
      // return result;

      const result = { 
        arv: "1",
        asIs: "2",
        vacant: 1,
      }
      return result;
    }, []);

    const changeToViewMode = React.useCallback(() => {
      navigation.setParams({ step: "summary" });
    }, []);
    const handleBackdropOnPress: ProfitSummaryEditViewProps['handleBackdropOnPress'] = React.useCallback(() => {
      changeToViewMode();
    }, [changeToViewMode]);
    const handleButtonConfirmOnPress: ProfitSummaryEditViewProps['handleButtonConfirmOnPress'] = () => {
      for (const field in profitSummaryEditOnlyFields) {
        const value = +eraseComma(profitSummaryEditOnlyFields[field]);
        if (value < 0) return;
      };
      changeToViewMode();
    };
    const handleButtonGroupVacantOnPress: ProfitSummaryEditViewProps['handleButtonGroupVacantOnPress'] = value => {
      // setPropertyInfoFields(result);
    };
    const handleOnChangeText: ProfitSummaryEditViewProps['handleOnChangeText'] = (key) => (value) => {
      const validValue = validateFormat(value);
      const result = { ...profitSummaryEditOnlyFields, [key]: validValue };
      // setPropertyInfoFields(result);
    };
    

  React.useEffect(() => {
    // console.log("ProfitSummary Mount");
    return () => {
      // console.log("ProfitSummary UnMount");
    }
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <>
      <ProfitSummaryEditView 
        buttonsForVacant={buttonsForVacant}
        handleBackdropOnPress={handleBackdropOnPress}
        handleButtonConfirmOnPress={handleButtonConfirmOnPress}
        handleButtonGroupVacantOnPress={handleButtonGroupVacantOnPress}
        handleOnChangeText={handleOnChangeText}
        modalVisible={modalVisible}
        profitSummaryEditOnlyFields={profitSummaryEditOnlyFields}
      />
      {step === "edit" ?
        <ProfitAdjustment 
          arv={arv}
          asIs={asIs}
          handleStepNavigation={handleStepNavigation}
          vacant={vacant}
        />
        :
        <ProfitSummaryView
          data={data}
          handleBannerButtonOnClick={handleBannerButtonOnClick}
          handleSaveOnPress={handleSaveOnPress}
          handleSubmitOnPress={handleSubmitOnPress}
          handleStepNavigation={handleStepNavigation}
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