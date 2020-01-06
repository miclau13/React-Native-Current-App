/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyRehabRequests
// ====================================================

export interface MyRehabRequests_myRehabRequests_rehabItemsPackage_rehabItems {
  __typename: "RehabItems";
  category: string;
  cost: number;
  name: string;
}

export interface MyRehabRequests_myRehabRequests_rehabItemsPackage {
  __typename: "RehabItemsPackage";
  id: string;
  rehabItems: MyRehabRequests_myRehabRequests_rehabItemsPackage_rehabItems[];
}

export interface MyRehabRequests_myRehabRequests {
  __typename: "RehabRequest";
  id: string;
  address: string;
  arv: number | null;
  asIs: number;
  propertyDetails: any | null;
  vacant: boolean | null;
  totalDebts: number | null;
  rehabItemsPackage: MyRehabRequests_myRehabRequests_rehabItemsPackage | null;
}

export interface MyRehabRequests {
  myRehabRequests: MyRehabRequests_myRehabRequests[];
}
