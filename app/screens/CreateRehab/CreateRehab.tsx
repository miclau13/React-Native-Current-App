import { gql } from 'apollo-boost';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import { getRehabItemCatergoriesMap } from './utils';
import CreateRehabView from './CreateRehabView';
import { RevisedRehabInfo } from '../PropertyInfo';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';
import { UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables } from '../../generated/UpdateRehabItemsPackage';


export interface Params {
  // From ContactPhoneNumberScreen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabId?: CreateRehabNoArv['createRehabNoArv']['rehabId'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
  // From CreateRehab itself after create Rehab
  revisedRehabInfo?: RevisedRehabInfo;
  // From ProfitSummaryScreen due to Back button
  arv?: CreateRehabNoArv['createRehabNoArv']['arv'];
  asIs?: number;
  vacant?: boolean;
};

type ScreenProps = {};

export type CreateRehabViewProps = {};

export type CreateRehabState = {
  initialState: {
    arv: number;
    asIs: number;
    totalDebts: number;
    vacant: boolean;
    remodellingCost: number;
    rehabItemCatergoriesMap: RehabItemCatergoriesMap;
  }
};

export interface CreateRehabAction {
  type: "UPDATE_ALL" | "UPDATE_FULL_REMODEL_SUMMARY_FIELDS" | "UPDATE_PROFIT_SUMMARY_FIELDS",
  category?: string;
  key?: string;
  newState?: CreateRehabState['initialState'];
  value?: number | boolean;
};

export type RehabItemCatergoriesMap = {
  [x: string]: {
    cost: number;
    selected: boolean;
  };
};

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

const useForceUpdate = () => React.useReducer(state => !state, false)[1];

const createSharedState = (reducer, initialState) => {
  const subscribers = [];
  let state = initialState;
  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach(callback => callback());
  };
  const useSharedState = () => {
    const forceUpdate = useForceUpdate();
    React.useEffect(() => {
      const callback = () => forceUpdate();
      subscribers.push(callback);
      callback(); // in case it's already updated
      const cleanup = () => {
        const index = subscribers.indexOf(callback);
        subscribers.splice(index, 1);
      };
      return cleanup;
    }, []);
    return [state, dispatch];
  };
  return useSharedState;
};
const initialState = {
  arv: 0, 
  asIs: 0, 
  totalDebts: 0,
  vacant: 0,    
  remodellingCost: 0,
  rehabItemCatergoriesMap: {},
};
export const createRehabActionReducer = (state: CreateRehabState['initialState'], action: CreateRehabAction) => {
  const { type, category, key, newState, value } = action;
  switch (type) {
    case 'UPDATE_ALL':
      return { 
        ...state, 
        ...newState,
      }
    case 'UPDATE_FULL_REMODEL_SUMMARY_FIELDS':
      return { 
        ...state, 
        rehabItemCatergoriesMap: {
          ...state['rehabItemCatergoriesMap'],
          [category]: {
            ...state['rehabItemCatergoriesMap'][category],
            selected: !state['rehabItemCatergoriesMap'][category]['selected'],
          }
        },
        remodellingCost: state['remodellingCost'] - state['rehabItemCatergoriesMap'][category]['cost']
      };
    case 'UPDATE_PROFIT_SUMMARY_FIELDS':
      return { 
        ...state, 
        [key]: value,
      };
    default:
      return state;
  }
};

export const useCreateRehab = createSharedState(createRehabActionReducer, initialState);

const CreateRehab: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const rehabId = navigation.getParam("rehabId", "");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");

  // State management for Full Remodel Summary and Profit Summary
  const { arv, asIs, totalDebts, vacant} = createRehabNoArvInput;
  const [state, dispatch] = useCreateRehab();

  const [createRehabNoArv, { error }] = useMutation<CreateRehabNoArv, CreateRehabNoArvVariables>(CREATE_REHAB_NO_ARV, {
    onCompleted: (data) => {
      if (!error && data && data.createRehabNoArv) {
        const result = data.createRehabNoArv;
        const _rehabItemCatergoriesMap = getRehabItemCatergoriesMap(result.rehabItemPackage.rehabItems);
        let _remodellingCost = 0;
        for (let key in _rehabItemCatergoriesMap) {
          _remodellingCost += _rehabItemCatergoriesMap[key]['cost'];
        };
        const _initalState = {
          arv, 
          asIs, 
          totalDebts,
          vacant,    
          remodellingCost: _remodellingCost, 
          rehabItemCatergoriesMap: _rehabItemCatergoriesMap,
        };
        dispatch({ type: 'UPDATE_ALL', newState: _initalState })
        navigation.navigate("FullRemodelSummaryScreen", { initialState: _initalState });
        // setInitalState(_initalState);
      } 
    },
  });
  const [updateRehabItemsPackage] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE);

  const createRehab = async () => {
    const result = await createRehabNoArv({ variables: { input: createRehabNoArvInput }});
    // if (result) {
    //   const rehab = result.data.createRehabNoArv;
    //   const itemsMap: RehabItemsPackageMap = (rehab.rehabItemPackage?.rehabItems || []).reduce((acc, item) => {
    //     if (!acc[item.category]) {
    //       acc[item.category] = {
    //         cost: item.cost,
    //         selected: item.selected,
    //       }
    //     } else {
    //       acc[item.category]["cost"] += item.cost;
    //     };
    //     acc[item.category]['order'] = acc[item.category]['order'] || getOrderForRehabItemsCategory(item.category);
    //     return acc;
    //   }, {});

    //   let dataArry: CreateRehabState['data'] = [];
    //   for (let [key, value] of Object.entries(itemsMap)) {
    //     dataArry.push({ category: key, value: value.cost, selected: value.selected, order: value.order });
    //   };
    //   const returnResult = {
    //     arv: rehab.arv,
    //     dataArry: sortBy(dataArry, ["order"]),
    //     postalCode: rehab.postalCode,
    //     rehabId: rehab.rehabId,
    //     rehabItems: rehab.rehabItemPackage.rehabItems.map(item => {
    //       return omit(item, ["__typename"]);
    //     }),
    //     rehabItemPackageId: rehab.rehabItemPackage.id,
    //     submitted: rehab.rehabItemPackage.submitted,
    //   };
    //   return returnResult;
    // };
    // return {};
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
    // if (result) {
    //   const rehab = result.data?.updateRehabItemsPackage;
    //   const itemsMap: RehabItemsPackageMap = (rehab.rehabItemsPackage?.rehabItems || []).reduce((acc, item) => {
    //     if (!acc[item.category]) {
    //       acc[item.category] = {
    //         cost: item.cost,
    //         selected: item.selected,
    //       }
    //     } else {
    //       acc[item.category]["cost"] += item.cost;
    //     };
    //     acc[item.category]['order'] = acc[item.category]['order'] || getOrderForRehabItemsCategory(item.category);
    //     return acc;
    //   }, {});

    //   let dataArry: CreateRehabState['data'] = [];
    //   for (let [key, value] of Object.entries(itemsMap)) {
    //     dataArry.push({ category: key, value: value.cost, selected: value.selected, order: value.order });
    //   };
    //   const returnResult = {
    //     arv: rehab.rehabRequest.arv,
    //     dataArry: sortBy(dataArry, ["order"]),
    //     postalCode: rehab.rehabRequest.postalCode,
    //     rehabId: rehab.rehabRequest.id,
    //     rehabItems: rehab.rehabItemsPackage.rehabItems.map(item => {
    //       return omit(item, ["__typename"]);
    //     }),
    //     rehabItemPackageId: rehab.rehabItemsPackage.id,
    //     submitted: rehab.rehabItemsPackage.submitted,
    //   };
    //   return returnResult;
    // };
    return {};
  };

  const bootstrapAsync = async () => {
    try {
      // const result = !rehabId ? await createRehab() : await updateRehab();
      await createRehab();
      // if (result) {
      //   const { arv, dataArry, postalCode: _postalCode, rehabId: _rehabId, rehabItems, rehabItemPackageId: _rehabItemPackageId } = result;
      //   setArv(arv);
      //   setData(dataArry);
      //   setRehabItems(rehabItems);
      //   // For revise flow
      //   const revisedRehabInfo = {
      //     arv,
      //     asIs,
      //     totalDebts,
      //     vacant,
      //     address: createRehabNoArvInput.address,
      //     contactPhoneNumber: createRehabNoArvInput.contactPhoneNumber,
      //     propertyDetails: getDefaultPropertyDetails(getDefaultPropertyInfoFields()),
      //     postalCode: _postalCode,
      //   };
      //   navigation.setParams({ 
      //     revisedRehabInfo,
      //     rehabId: _rehabId,
      //     rehabItemPackageId: _rehabItemPackageId,
      //   });
      // }
    } catch (e) {
      console.log("createRehab e", e)
    }
  };


  React.useEffect(() => {
    // console.log("CreateRehab Mount");
    bootstrapAsync();
    return () => {
      // console.log("CreateRehab UnMount");
    }
  }, []);

  return (
    <CreateRehabView />
  )
};

export default React.memo(CreateRehab);