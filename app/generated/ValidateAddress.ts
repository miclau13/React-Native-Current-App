/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ValidateAddress
// ====================================================

export interface ValidateAddress_validateAddress {
  __typename: "validateAddressOutput";
  isValidateAddress: boolean | null;
  fullAddress: string;
  streetNumber: string | null;
  streetName: string | null;
  city: string | null;
  county: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface ValidateAddress {
  validateAddress: ValidateAddress_validateAddress;
}

export interface ValidateAddressVariables {
  input: string;
}
