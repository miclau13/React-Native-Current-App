/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateRehabNoArvInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRehabNoArv
// ====================================================

export interface CreateRehabNoArv_createRehabNoArv_rehabItemPackage_rehabItems {
  __typename: "RehabItems";
  category: string;
  cost: number;
  name: string;
  selected: boolean;
}

export interface CreateRehabNoArv_createRehabNoArv_rehabItemPackage {
  __typename: "RehabItemsPackage";
  id: string;
  rehabItems: CreateRehabNoArv_createRehabNoArv_rehabItemPackage_rehabItems[];
  submitted: boolean;
}

export interface CreateRehabNoArv_createRehabNoArv {
  __typename: "CreateRehabOutput";
  arv: number | null;
  rehabId: string | null;
  rehabItemPackage: CreateRehabNoArv_createRehabNoArv_rehabItemPackage | null;
}

export interface CreateRehabNoArv {
  createRehabNoArv: CreateRehabNoArv_createRehabNoArv;
}

export interface CreateRehabNoArvVariables {
  input: CreateRehabNoArvInput;
}
