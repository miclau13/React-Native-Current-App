/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateRehabInput {
  address: string;
  asIs: number;
  propertyDetails?: PropertyDetailsInput | null;
  images?: (string | null)[] | null;
  sqft?: number | null;
  beds?: number | null;
  fullBaths?: number | null;
  threeQuarterBaths?: number | null;
  halfBaths?: number | null;
  style?: string | null;
  totalDebts?: number | null;
  vacant?: boolean | null;
  contactPhoneNumber?: string | null;
}

export interface CreateRehabNoArvInput {
  address: string;
  postalCode: string;
  arv: number;
  asIs: number;
  propertyDetails?: PropertyDetailsInput | null;
  images?: (string | null)[] | null;
  sqft?: number | null;
  beds?: number | null;
  fullBaths?: number | null;
  threeQuarterBaths?: number | null;
  halfBaths?: number | null;
  style?: string | null;
  totalDebts?: number | null;
  vacant?: boolean | null;
  contactPhoneNumber?: string | null;
}

export interface DeleteRehabInput {
  rehabId: string;
}

export interface DetailInput {
  size: number;
  order: number;
}

export interface IBuyerProjectsAutoCompleteQuery {
  query: string;
}

export interface PropertyDetailsInput {
  fullBathsInfo: DetailInput[];
  threeQuarterBathsInfo?: DetailInput[] | null;
  halfBathsInfo?: DetailInput[] | null;
  bedsInfo: DetailInput[];
  kitchenCabinetUpperLength: number;
  kitchenCabinetBaseLength: number;
  kitchenCabinetIslandLength: number;
}

export interface PropertyInfoQuery {
  address: string;
}

export interface RehabItemsInput {
  id?: string | null;
  name?: string | null;
  unit?: number | null;
  costPerUnit?: number | null;
  category?: string | null;
  selected?: boolean | null;
  custom?: boolean | null;
  calculationMethod?: string | null;
  cost?: number | null;
}

export interface RehabItemsPackageInput {
  submitted?: boolean | null;
  rehabItems?: (RehabItemsInput | null)[] | null;
  selected?: boolean | null;
  id?: string | null;
}

export interface RehabRequestInput {
  id: string;
  address?: string | null;
  asIs?: number | null;
  propertyDetails?: any | null;
  images?: (string | null)[] | null;
  arv?: number | null;
  vacant?: boolean | null;
  totalDebts?: number | null;
}

export interface UpdateRehabItemsPackageInput {
  rehabItemsPackage?: RehabItemsPackageInput | null;
  rehabRequest?: RehabRequestInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
