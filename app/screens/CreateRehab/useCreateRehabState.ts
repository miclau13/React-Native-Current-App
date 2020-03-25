import React, { Dispatch, ReducerAction } from 'react';

import { RehabItemsPackageInput, RehabRequestInput } from '../../generated/globalTypes';

export type CreateRehabState = {
  initialState: {
    arv: number;
    asIs: number;
    taxRate: number;
    totalDebts: number;
    vacant: boolean;
    remodellingCost: number;
    rehabId: RehabRequestInput['id'];
    rehabItems: RehabItemsPackageInput['rehabItems'];
    rehabItemsPackageId: RehabItemsPackageInput['id'];
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

type CreateRehabActionReducer = typeof createRehabActionReducer;

const useForceUpdate = () => React.useReducer(state => !state, false)[1];
const createSharedState = (reducer: CreateRehabActionReducer, initialState: CreateRehabState['initialState']) => {
  const subscribers = [];
  let state = initialState;
  const dispatch = (action: CreateRehabAction) => {
    state = reducer(state, action);
    subscribers.forEach(callback => callback());
  };
  const useSharedState: () => [CreateRehabState['initialState'], Dispatch<ReducerAction<CreateRehabActionReducer>>] = () => {
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
  taxRate: 0,
  totalDebts: 0,
  vacant: true,    
  remodellingCost: 0,
  rehabId: "",
  rehabItems: [],
  rehabItemsPackageId: "",
  rehabItemCatergoriesMap: {},
};
const createRehabActionReducer = (state: CreateRehabState['initialState'], action: CreateRehabAction) => {
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
        rehabItems: 
          state['rehabItems'].map(item => {
          return {
            ...item,
            selected: item.category == category ? !item.selected : item.selected,
          }
        }),
        rehabItemCatergoriesMap: {
          ...state['rehabItemCatergoriesMap'],
          [category]: {
            ...state['rehabItemCatergoriesMap'][category],
            selected: !state['rehabItemCatergoriesMap'][category]['selected'],
          }
        },
        remodellingCost: 
          state['rehabItemCatergoriesMap'][category]['selected'] ?
            state['remodellingCost'] -  state['rehabItemCatergoriesMap'][category]['cost'] : 
            state['remodellingCost'] + state['rehabItemCatergoriesMap'][category]['cost']
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
export const useCreateRehabState = createSharedState(createRehabActionReducer, initialState);

