import { gql } from 'apollo-boost';
import { omit, sortBy } from 'lodash';
import React from 'react';
import { ListItemProps } from 'react-native-elements'
import { ButtonProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import FullRemodelSummaryView from './FullRemodelSummaryView';
import { LoadingComponent } from '../InitialLoading';
import { RevisedRehabInfo } from '../PropertyInfo';
import { CreateRehabNoArv, CreateRehabNoArv_createRehabNoArv_rehabItemPackage_rehabItems, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';
import { UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables } from '../../generated/UpdateRehabItemsPackage';
import { 
  getDefaultPropertyDetails, 
  getDefaultPropertyInfoFields, 
} from '../PropertyInfo/utils';

export interface Params {
  // From ContactPhoneNumberScreen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabId?: CreateRehabNoArv['createRehabNoArv']['rehabId'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
  // From FullRemodelSummary itself after create Rehab
  revisedRehabInfo?: RevisedRehabInfo;
  // From ProfitSummaryScreen due to Back button
  arv?: CreateRehabNoArv['createRehabNoArv']['arv'];
  asIs?: number;
  vacant?: boolean;
};

type ScreenProps = {};

export type FullRemodelSummaryProps = {
  data: FullRemodelSummaryState['data'];
  handleCheckBoxOnPress(i: number): ListItemProps['checkBox']['onPress'];
  handleOnPress: ButtonProps['onPress'];
  totalCost: number;
};

export type FullRemodelSummaryState = {
  arv: Params['arv'];
  data: RehabItemsPackage[];
  rehabItems: Omit<CreateRehabNoArv_createRehabNoArv_rehabItemPackage_rehabItems, "__typename">[];
};

type RehabItemsPackage = {
  // TODO change to ENUM
  category: string;
  order: number;
  selected: boolean;
  value: number;
};

type RehabItemsPackageMap = {
  [key: string]: {
    cost: number;
    order: number;
    selected: boolean;
  }
}

const CREATE_REHAB_NO_ARV = gql`
  mutation CreateRehabNoArv($input: CreateRehabNoArvInput!) {
    createRehabNoArv(input: $input) {
      arv
      postalCode
      rehabId
      rehabItemPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
          unit
          costPerUnit
          custom
          calculationMethod
          order
        }
        submitted
      }
    }
  }
`;

const UPDATE_REHAB_ITEMS_PACKAGE = gql`
  mutation UpdateRehabItemsPackage($input: UpdateRehabItemsPackageInput!) {
    updateRehabItemsPackage(input: $input) {
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
          unit
          costPerUnit
          custom
          calculationMethod
          order
          id
          roomName
          measurement
          measurementUnit
          notes
        }
        submitted
      }
      rehabRequest {
        id
        arv
        postalCode
      }
    }
  }
`;

const getOrderForRehabItemsCategory = (key: string) => {
  switch (key) {
    case "Kitchen": 
      return 0;
    case "Full Bath": 
      return 1;
    case "Flooring": 
      return 2;
    case "Interior Paint": 
    case  "Paint - Walls":
      return 3;
    case "Clean up": 
      return 4;
    case "Staging": 
      return 5;
    default:
      return 6;
  }
};

const FullRemodelSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const [createRehabNoArv] = useMutation<CreateRehabNoArv, CreateRehabNoArvVariables>(CREATE_REHAB_NO_ARV);
  const [updateRehabItemsPackage] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE);

  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", "");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");

  const totalDebts = createRehabNoArvInput.totalDebts;
  const vacant = createRehabNoArvInput.vacant;
  const asIs = createRehabNoArvInput.asIs;

  const [arv, setArv] = React.useState<FullRemodelSummaryState['arv']>();
  const [data, setData] = React.useState<FullRemodelSummaryState['data']>();
  const [rehabItems, setRehabItems] = React.useState<FullRemodelSummaryState['rehabItems']>();

  const updatedArv = navigation.getParam("arv", null);
  const updatedAsIs = navigation.getParam("asIs", null);
  const updatedVacant = navigation.getParam("vacant", null);

  const createRehab = async () => {
    const result = await createRehabNoArv({ variables: { input: createRehabNoArvInput }});
    if (result) {
      const rehab = result.data.createRehabNoArv;
      const itemsMap: RehabItemsPackageMap = (rehab.rehabItemPackage?.rehabItems || []).reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = {
            cost: item.cost,
            selected: item.selected,
          }
        } else {
          acc[item.category]["cost"] += item.cost;
        };
        acc[item.category]['order'] = acc[item.category]['order'] || getOrderForRehabItemsCategory(item.category);
        return acc;
      }, {});

      let dataArry: FullRemodelSummaryState['data'] = [];
      for (let [key, value] of Object.entries(itemsMap)) {
        dataArry.push({ category: key, value: value.cost, selected: value.selected, order: value.order });
      };
      const returnResult = {
        arv: rehab.arv,
        dataArry: sortBy(dataArry, ["order"]),
        postalCode: rehab.postalCode,
        rehabId: rehab.rehabId,
        rehabItems: rehab.rehabItemPackage.rehabItems.map(item => {
          return omit(item, ["__typename"]);
        }),
        rehabItemPackageId: rehab.rehabItemPackage.id,
        submitted: rehab.rehabItemPackage.submitted,
      };
      return returnResult;
    };
    return {};
  };

  const updateRehab = async () => {
    const updateRehabItemsPackageInput = {
      rehabRequest: {
        id: rehabId,
        ...createRehabNoArvInput
      },
      rehabItemsPackage: {
        id: rehabItemPackageId
      }
    };
    const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
    if (result) {
      const rehab = result.data?.updateRehabItemsPackage;
      const itemsMap: RehabItemsPackageMap = (rehab.rehabItemsPackage?.rehabItems || []).reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = {
            cost: item.cost,
            selected: item.selected,
          }
        } else {
          acc[item.category]["cost"] += item.cost;
        };
        acc[item.category]['order'] = acc[item.category]['order'] || getOrderForRehabItemsCategory(item.category);
        return acc;
      }, {});

      let dataArry: FullRemodelSummaryState['data'] = [];
      for (let [key, value] of Object.entries(itemsMap)) {
        dataArry.push({ category: key, value: value.cost, selected: value.selected, order: value.order });
      };
      const returnResult = {
        arv: rehab.rehabRequest.arv,
        dataArry: sortBy(dataArry, ["order"]),
        postalCode: rehab.rehabRequest.postalCode,
        rehabId: rehab.rehabRequest.id,
        rehabItems: rehab.rehabItemsPackage.rehabItems.map(item => {
          return omit(item, ["__typename"]);
        }),
        rehabItemPackageId: rehab.rehabItemsPackage.id,
        submitted: rehab.rehabItemsPackage.submitted,
      };
      return returnResult;
    };
    return {};
  };

  const bootstrapAsync = async () => {
    try {
      const result = !rehabId ? await createRehab() : await updateRehab();
      if (result) {
        const { arv, dataArry, postalCode: _postalCode, rehabId: _rehabId, rehabItems, rehabItemPackageId: _rehabItemPackageId } = result;
        setArv(arv);
        setData(dataArry);
        setRehabItems(rehabItems);
        // For revise flow
        const revisedRehabInfo = {
          arv,
          asIs,
          totalDebts,
          vacant,
          address: createRehabNoArvInput.address,
          contactPhoneNumber: createRehabNoArvInput.contactPhoneNumber,
          propertyDetails: getDefaultPropertyDetails(getDefaultPropertyInfoFields()),
          postalCode: _postalCode,
        };
        navigation.setParams({ 
          revisedRehabInfo,
          rehabId: _rehabId,
          rehabItemPackageId: _rehabItemPackageId,
        });
      }
    } catch (e) {
      console.log("createRehab e", e)
    }
  };

  const handleCheckBoxOnPress: FullRemodelSummaryProps['handleCheckBoxOnPress'] = (i) => () => {
    const result = data.map((item, index) => {
      if (index === i) {
        item.selected = !data[i].selected
      }
      return item;
    });
    const updatedRehabItems = rehabItems.map((item) => {
      if (item.category === data[i].category) {
        item.selected = !item.selected;
      }
      return item;
    });
    setData(result);
    setRehabItems(updatedRehabItems);
  };

  const totalCost = React.useMemo<FullRemodelSummaryProps['totalCost']>(() => {
    const cost = (data || []).reduce((acc, item) => {
      if (item.selected) {
        acc += item.value;
      }
      return acc;
    }, 0);
    return cost;
  }, [data]);

  const handleOnPress = React.useCallback<FullRemodelSummaryProps['handleOnPress']>(() => {
    navigation.navigate("ProfitSummaryScreen", { 
      rehabId,
      totalDebts,
      arv: updatedArv ? updatedArv : arv, 
      asIs: updatedAsIs ? updatedAsIs: asIs,
      rehabItemPackage: {
        rehabItems,
        id: rehabItemPackageId,
      },
      remodellingCost: totalCost, 
      step: "summary",
      vacant: updatedVacant ? updatedVacant: vacant,
    });
  }, [arv, asIs, data, rehabId, rehabItems, rehabItemPackageId, setArv,
    updatedArv, updatedAsIs, updatedVacant, vacant]);

  React.useEffect(() => {
    // console.log("FullRemodelSummary Mount");
    bootstrapAsync();
    return () => {
      // console.log("FullRemodelSummary UnMount");
    }
  }, []);

  if (!data) {
    return (
      <LoadingComponent />
    )
  };

  return (
    <FullRemodelSummaryView 
      data={data}
      handleCheckBoxOnPress={handleCheckBoxOnPress}
      handleOnPress={handleOnPress}
      totalCost={totalCost}
    />
  )
};

export default React.memo(FullRemodelSummary);