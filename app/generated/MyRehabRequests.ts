/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyRehabRequests
// ====================================================

export interface MyRehabRequests_myRehabRequests_rehabItemsPackage_rehabItems {
  __typename: "RehabItems";
  category: string;
  cost: number | null;
  name: string;
  selected: boolean;
}

export interface MyRehabRequests_myRehabRequests_rehabItemsPackage_revisedRehabItems {
  __typename: "RehabItems";
  category: string;
  cost: number | null;
  name: string;
  selected: boolean;
}

export interface MyRehabRequests_myRehabRequests_rehabItemsPackage {
  __typename: "RehabItemsPackage";
  id: string;
  rehabItems: MyRehabRequests_myRehabRequests_rehabItemsPackage_rehabItems[];
  revisedRehabItems: MyRehabRequests_myRehabRequests_rehabItemsPackage_revisedRehabItems[] | null;
  submitted: boolean;
}

export interface MyRehabRequests_myRehabRequests {
  __typename: "RehabRequest";
  id: string;
  address: string;
  arv: number | null;
  asIs: number;
  contactPhoneNumber: string | null;
  postalCode: string | null;
  propertyDetails: any | null;
  totalDebts: number | null;
  vacant: boolean | null;
  beds: number | null;
  fullBaths: number | null;
  halfBaths: number | null;
  threeQuarterBaths: number | null;
  sqft: number | null;
  style: string | null;
  rehabItemsPackage: MyRehabRequests_myRehabRequests_rehabItemsPackage | null;
}

export interface MyRehabRequests {
  myRehabRequests: MyRehabRequests_myRehabRequests[];
}
