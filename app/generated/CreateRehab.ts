/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateRehabInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRehab
// ====================================================

export interface CreateRehab_createRehab_rehabItemPackage_rehabItems {
  __typename: "RehabItems";
  category: string;
  cost: number | null;
  name: string;
  selected: boolean;
  unit: number;
  costPerUnit: number | null;
  custom: boolean;
  calculationMethod: string;
  order: number | null;
}

export interface CreateRehab_createRehab_rehabItemPackage {
  __typename: "RehabItemsPackage";
  id: string;
  rehabItems: CreateRehab_createRehab_rehabItemPackage_rehabItems[];
  submitted: boolean;
}

export interface CreateRehab_createRehab {
  __typename: "CreateRehabOutput";
  arv: number | null;
  rehabId: string | null;
  rehabItemPackage: CreateRehab_createRehab_rehabItemPackage | null;
}

export interface CreateRehab {
  createRehab: CreateRehab_createRehab;
}

export interface CreateRehabVariables {
  input: CreateRehabInput;
}
