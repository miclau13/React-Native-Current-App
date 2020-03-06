import { gql } from 'apollo-boost';
import React from 'react';
import { ButtonGroupProps } from 'react-native-elements';
import { ModalProps } from 'react-native-modal';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import { getValuesInProfitSummaryViewOnlyFieldsFormat } from './utils';
import ProfitSummaryView from './ProfitSummaryView';
import { LoadingComponent } from '../InitialLoading';
import { Params as FullRemodelSummaryParams, FullRemodelSummaryProps, FullRemodelSummaryState } from '../FullRemodelSummary';
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

export type ProfitSummaryViewProps = {
  fields: ProfitSummaryViewOnlyFields;
  handleEditOnPress: ButtonProps['onPress'];
  handleSaveOnPress: ButtonProps['onPress'];
  handleSubmitOnPress: ButtonProps['onPress'];
  status: ProfitSummaryState['status'];
  submitted: ProfitSummaryState['submitted'];
};

export type ProfitSummaryState = {
  loading: boolean;
  profitSummaryFields: ProfitSummaryFields;
  status: string;
  submitted: boolean;
};

export type ProfitSummaryFields = {
  arv: number;
  asIs: number;
  profit: number;
  roi: number;
  remodellingCost: number;
  totalDebts: number;
  vacant: boolean;
};

type ProfitSummaryEditOnlyFields = {
  arv: string;
  asIs: string;
  vacant: number;
};
type ProfitSummaryViewOnlyFields = {
  color: string | null;
  icon: string | null;
  lowerLimit: number | null;
  name: string;
  order: string;
  upperLimit: number | null;
  value: number | boolean | null;
}[]

export interface ProfitSummaryEditViewProps {
  buttonsForVacant: ('NO' | 'YES')[];
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonConfirmOnPress: ButtonProps['onPress'];
  handleButtonGroupVacantOnPress: ButtonGroupProps['onPress'];
  handleOnChangeText: (key: 'arv' | 'asIs') => TextInputProps['onChangeText'];
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

  const profit = React.useMemo(() => {
    return arv - asIs - remodellingCost;
  }, [arv, asIs, remodellingCost]);
  const roi = React.useMemo(() => {
    return profit / remodellingCost * 100;
  },[profit, remodellingCost]);

  const [loading, setLoading] = React.useState<ProfitSummaryState['loading']>(false);
  const [profitSummaryFields, setProfitSummaryFields] = React.useState<ProfitSummaryState['profitSummaryFields']>({
    arv, 
    asIs, 
    profit,
    remodellingCost,
    roi,
    totalDebts,
    vacant,
  });
  const [status, setStatus] = React.useState<ProfitSummaryState['status']>("");
  const [submitted, setSubmitted] = React.useState<ProfitSummaryState['submitted']>(navigation.getParam("submitted", false));

  const profitSummaryEditOnlyFields = React.useMemo<ProfitSummaryEditViewProps['profitSummaryEditOnlyFields']>(() => {
    const _arv = validateFormat(`${profitSummaryFields.arv}`);
    const _asIs = validateFormat(`${profitSummaryFields.asIs}`);
    const _vacant = Number(profitSummaryFields.vacant);
    return {
      arv: _arv,
      asIs: _asIs,
      vacant: _vacant,
    }
  }, [profitSummaryFields]);

  const profitSummaryViewOnlyFields = React.useMemo<ProfitSummaryViewProps['fields']>(() => {
    return getValuesInProfitSummaryViewOnlyFieldsFormat(profitSummaryFields);
  }, [profitSummaryFields]);

  // For ProfitSummaryView
  const changeToEditMode = React.useCallback(() => {
    navigation.setParams({ step: "edit" });
  }, []);
  const handleEditOnPress = React.useCallback<ProfitSummaryViewProps['handleEditOnPress']>((nextStep, options = {}) => {
    changeToEditMode();
  }, []);
  const handleSaveOnPress: ProfitSummaryViewProps['handleSaveOnPress'] = async () => {
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
        setStatus("Updated Successfully!");
        setLoading(false);
      }

    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
      setLoading(false);
    }
  };
  const handleSubmitOnPress: ProfitSummaryViewProps['handleSubmitOnPress'] = async () => {
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

  // For ProfitSummaryEditView
  const buttonsForVacant = React.useMemo<ProfitSummaryEditViewProps['buttonsForVacant']>(() => {
    return ['NO', 'YES'];
  }, []);
  const changeToViewMode = React.useCallback(() => {
    navigation.setParams({ step: "summary" });
  }, []);
  const handleBackdropOnPress: ProfitSummaryEditViewProps['handleBackdropOnPress'] = React.useCallback(() => {
    changeToViewMode();
  }, [changeToViewMode]);
  const handleButtonConfirmOnPress: ProfitSummaryEditViewProps['handleButtonConfirmOnPress'] = () => {
    changeToViewMode();
  };
  const handleButtonGroupVacantOnPress: ProfitSummaryEditViewProps['handleButtonGroupVacantOnPress'] = value => {
    const result = { ...profitSummaryFields, vacant: !!value };
    setProfitSummaryFields(result);
  };
  const handleOnChangeText: ProfitSummaryEditViewProps['handleOnChangeText'] = (key) => (value) => {
    const result = { ...profitSummaryFields, [key]: +eraseComma(value) };
    setProfitSummaryFields(result);
  };
  const modalVisible = React.useMemo<ProfitSummaryEditViewProps['modalVisible']>(() => {
    return step == 'edit';
  }, [step]);

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
      <ProfitSummaryView
        fields={profitSummaryViewOnlyFields}
        handleSaveOnPress={handleSaveOnPress}
        handleSubmitOnPress={handleSubmitOnPress}
        handleEditOnPress={handleEditOnPress}
        status={status}
        submitted={submitted}
      />
    </>
  )
};

export default React.memo(ProfitSummary);