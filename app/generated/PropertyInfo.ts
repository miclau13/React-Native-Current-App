/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PropertyInfoQuery } from "./globalTypes";

// ====================================================
// GraphQL query operation: PropertyInfo
// ====================================================

export interface PropertyInfo_propertyInfo {
  __typename: "PropertyInfo";
  beds: number | null;
  sqft: number | null;
  fullBaths: number | null;
  threeQuarterBaths: number | null;
  halfBaths: number | null;
  style: string | null;
}

export interface PropertyInfo {
  propertyInfo: PropertyInfo_propertyInfo;
}

export interface PropertyInfoVariables {
  query: PropertyInfoQuery;
}
