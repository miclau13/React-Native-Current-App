/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { IBuyerProjectsAutoCompleteQuery } from "./globalTypes";

// ====================================================
// GraphQL query operation: IbuyerAutoComplete
// ====================================================

export interface IbuyerAutoComplete_iBuyerProjectsAutoComplete {
  __typename: "IBuyerProjectsAutoComplete";
  value: string;
}

export interface IbuyerAutoComplete {
  iBuyerProjectsAutoComplete: IbuyerAutoComplete_iBuyerProjectsAutoComplete[];
}

export interface IbuyerAutoCompleteVariables {
  query: IBuyerProjectsAutoCompleteQuery;
}
