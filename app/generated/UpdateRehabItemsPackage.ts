/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateRehabItemsPackageInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRehabItemsPackage
// ====================================================

export interface UpdateRehabItemsPackage_updateRehabItemsPackage_rehabItemsPackage_rehabItems {
  __typename: "RehabItems";
  category: string | null;
  cost: number | null;
  name: string;
}

export interface UpdateRehabItemsPackage_updateRehabItemsPackage_rehabItemsPackage {
  __typename: "RehabItemsPackage";
  id: string;
  rehabItems: UpdateRehabItemsPackage_updateRehabItemsPackage_rehabItemsPackage_rehabItems[];
}

export interface UpdateRehabItemsPackage_updateRehabItemsPackage_rehabRequest {
  __typename: "RehabRequest";
  id: string;
  address: string;
  asIs: number;
  arv: number | null;
}

export interface UpdateRehabItemsPackage_updateRehabItemsPackage {
  __typename: "UpdateRehabOutput";
  rehabItemsPackage: UpdateRehabItemsPackage_updateRehabItemsPackage_rehabItemsPackage | null;
  rehabRequest: UpdateRehabItemsPackage_updateRehabItemsPackage_rehabRequest | null;
}

export interface UpdateRehabItemsPackage {
  updateRehabItemsPackage: UpdateRehabItemsPackage_updateRehabItemsPackage | null;
}

export interface UpdateRehabItemsPackageVariables {
  input: UpdateRehabItemsPackageInput;
}
