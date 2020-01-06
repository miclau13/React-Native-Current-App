/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Viewer
// ====================================================

export interface Viewer_viewer {
  __typename: "User";
  id: string;
  givenName: string | null;
  familyName: string | null;
  picture: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
}

export interface Viewer {
  viewer: Viewer_viewer;
}
