import { gql } from 'apollo-boost';
import { mapValues, omit, sortBy } from 'lodash';
import React from 'react';
import { ModalProps } from 'react-native-modal';
import { ButtonProps, TextInputProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useLazyQuery } from '@apollo/react-hooks';

import PropertyInfoView from './PropertyInfoView';
import { 
  getDefaultPropertyDetails, 
  getDefaultPropertyInfoFields, 
  getDefaultRevisedPropertyInfoFields,
  getRequiredPropertyInfoFields, 
  getValuesInPropertyInfoViewOnlyFieldsFormat
} from './utils';
import { FiximizeFlow } from '../Autocomplete';
import PropertyInfoEditView from './PropertyInfoEditView';
import { LoadingComponent } from '../InitialLoading';
import { eraseComma, validateFormat } from '../../components/NumberInput/utils';
import { PropertyDetailsInput } from '../../generated/globalTypes';
import { PropertyInfo as PropertyInfoData, PropertyInfo_propertyInfo } from '../../generated/PropertyInfo';
import { CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';

type Params = { 
  flow: FiximizeFlow;
  address: string;
  arvEstimate: number;
  asIsEstimate: number;
  totalDebts: number;
  loading?: boolean;
  postalCode?: string;
  rehabId?: string;
  rehabItemPackageId?: string;
  revisedRehabInfo?: RevisedRehabInfo;
  step?: string;
};

type ScreenProps = {};

type PropertyData = {
  name: keyof PropertyInfo_propertyInfo;
  order: number;
  value: string;
};

export type PropertyInfoFields = Omit<PropertyInfo_propertyInfo, "__typename">;

export type PropertyInfoEditableFields = {
  beds: string;
  fullBaths: string;
  halfBaths: string;
  sqft: string;
  threeQuarterBaths: string;
};

export interface PropertyDetails extends PropertyDetailsInput {};

export type RevisedRehabInfo = {
  address: string;
  arv: number;
  asIs: number;
  contactPhoneNumber: string;
  postalCode: string;
  totalDebts: number;
  vacant: boolean;
  propertyDetails: PropertyDetails
};
export interface PropertyInfoEditViewProps {
  fields: PropertyInfoEditableFields,
  handleBackdropOnPress: ModalProps['onBackdropPress'];
  handleButtonSaveOnPress: ButtonProps['onPress'];
  handleOnChangeText: (key: string) => TextInputProps['onChangeText'];
  modalVisible: ModalProps['isVisible'];
};

export interface PropertyInfoViewProps {
  fields: PropertyData[];
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

  const address = navigation.getParam("address", "");
  const arvEstimate = navigation.getParam("arvEstimate", null);
  const asIsEstimate = navigation.getParam("asIsEstimate", null);
  const flow = navigation.getParam("flow");
  const postalCode = navigation.getParam("postalCode", "");
  const rehabId = navigation.getParam("rehabId", null);
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", null);
  const revisedRehabInfo = navigation.getParam("revisedRehabInfo", getDefaultRevisedPropertyInfoFields());
  const step = navigation.getParam("step", 'summary');
  const totalDebts = navigation.getParam("totalDebts", null);

  const [propertyInfoFields, setPropertyInfoFields] = React.useState<PropertyInfoFields>(getDefaultPropertyInfoFields());

  const isModalVisible = React.useMemo(() => {
    return step == 'edit';
  }, [step]);
  const propertyInfoViewOnlyFields = React.useMemo<PropertyInfoViewProps['fields']>(() => {
    let _propertyInfoViewOnlyFields = [];
    if (propertyInfoFields) {
      _propertyInfoViewOnlyFields = getValuesInPropertyInfoViewOnlyFieldsFormat(propertyInfoFields);
    };
    _propertyInfoViewOnlyFields = sortBy(_propertyInfoViewOnlyFields, ['order']);
    return _propertyInfoViewOnlyFields;
  }, [propertyInfoFields]);
  const propertyInfoEditOnlyFields = React.useMemo<PropertyInfoEditableFields>(() => {
    const result = mapValues(omit(propertyInfoFields, ["style"]), value => {
      const validValue = validateFormat(value.toString());
      return validValue;
    });
    return result;
  }, [propertyInfoFields]);

  const [getPropertyInfo, { error, loading: getPropertyInfoLoading }] = useLazyQuery<PropertyInfoData>(PROPERTY_INFO, { 
    onCompleted: (data) => {
      if (!error && data && data.propertyInfo) {
        let _propertyInfoFields = omit(data.propertyInfo, ["__typename"]);
        // If comes from flow 2, merge the propertyInfo
        if (rehabId && revisedRehabInfo) {
          _propertyInfoFields = { ..._propertyInfoFields, ...getUpdatedPropertyInfo({ revisedRehabInfo })};
        };
        setPropertyInfoFields(_propertyInfoFields);
      } 
    },
  });

  // For PropertyInfoEditView
  const changeToViewMode = () => {
    navigation.setParams({ step: "summary" });
  };
  const handleBackdropOnPress: PropertyInfoEditViewProps['handleBackdropOnPress'] = () => {
    changeToViewMode();
  };
  const handleButtonSaveOnPress: ButtonProps['onPress'] = () => {
    for (const field in propertyInfoEditOnlyFields) {
      const value = +eraseComma(propertyInfoEditOnlyFields[field]);
      switch (field) {
        case "halfBaths":
        case "threeQuarterBaths":
          if (value < 0) return;
          break;
        default: 
          if (value < 1) return;
      }
    };
    changeToViewMode();
  };
  const handleOnChangeText: PropertyInfoEditViewProps['handleOnChangeText'] = (key) => (value) => {
    const validValue = validateFormat(value);
    const result = { ...propertyInfoFields, [key]: validValue };
    setPropertyInfoFields(result);
  };
  const handleButtonContinueOnPress = React.useCallback<PropertyInfoViewProps['handleButtonContinueOnPress']>(() => {
    const propertyDetails = getDefaultPropertyDetails(propertyInfoFields);
    const _propertyInfoFields = mapValues(omit(propertyInfoFields, ["style"]), (value, key) => {
      const _value = +eraseComma(value);
      return _value;
    });
    const revisedRehabInfoInput = rehabId ? revisedRehabInfo : {};
    const createRehabNoArvInput: CreateRehabNoArvVariables['input'] = {
      // Order is important
      address,
      arv: arvEstimate,
      asIs: asIsEstimate,
      totalDebts,
      vacant: true,
      postalCode,
      ...revisedRehabInfoInput,
      propertyDetails,
      style: propertyInfoFields.style,
      ..._propertyInfoFields,
    };
    navigation.navigate("VacantPropertyScreen", { createRehabNoArvInput, rehabId, rehabItemPackageId });
  }, [address, arvEstimate, asIsEstimate, propertyInfoFields, revisedRehabInfo, postalCode, totalDebts]);

  // Update PropertyInfo if has revisedRehabInfo
  const getUpdatedPropertyInfo = (params: { revisedRehabInfo: RevisedRehabInfo }) => {    
    const _propertyInfoFields = getRequiredPropertyInfoFields(revisedRehabInfo);
    return _propertyInfoFields;
  };

  React.useEffect(() => {
    // Prepare the values if comes from normal flow
    if (flow === FiximizeFlow.AutoCompleteAddress) {
      getPropertyInfo({
        variables: { query: { address: address }}
      })
    };
    // Prepare the values if comes from rehab record edit flow
    if (flow == 2) {
      const _address = revisedRehabInfo.address;
      // temp check where manually input address or not
      if (_address.includes("USA")) {
        const _propertyInfoFields = getUpdatedPropertyInfo({ revisedRehabInfo });
        setPropertyInfoFields(_propertyInfoFields);
      } else {
        getPropertyInfo({
          variables: { query: { address: _address }}
        });
      }
    };
    // Do not call getPropertyInfo if flow = FiximizeFlow.SelfInputAddress
    navigation.setParams({ loading: false })
    return () => {};
  }, [rehabId]);

  if (getPropertyInfoLoading) {
    return (<LoadingComponent />)
  };

  return (
    <>
      <PropertyInfoView 
        fields={propertyInfoViewOnlyFields}
        handleButtonContinueOnPress={handleButtonContinueOnPress}
      />
      <PropertyInfoEditView
        fields={propertyInfoEditOnlyFields}
        handleBackdropOnPress={handleBackdropOnPress}
        handleButtonSaveOnPress={handleButtonSaveOnPress}
        handleOnChangeText={handleOnChangeText}
        modalVisible={isModalVisible}
      />
    </>
  )
};

export default React.memo(PropertyInfo);  