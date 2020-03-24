import { gql } from 'apollo-boost';
import { omit } from 'lodash';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import { getRehabItemCatergoriesMap } from './utils';
import { useCreateRehabState } from './useCreateRehabState';
import CreateRehabView from './CreateRehabView';
import { RevisedRehabInfo } from '../PropertyInfo';
import { 
  getDefaultPropertyDetails, 
  getDefaultPropertyInfoFields, 
} from '../PropertyInfo/utils';
import { uploadPhotos } from '../../common/utils/UploadImages';
import { calculateRemodelingCost } from '../../common/utils/Calculator';
import { CreateRehabNoArv, CreateRehabNoArvVariables } from '../../generated/CreateRehabNoArv';
import { UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables } from '../../generated/UpdateRehabItemsPackage';

export interface Params {
  // From ContactPhoneNumberScreen for normal input flow
  createRehabNoArvInput?: CreateRehabNoArvVariables['input'];
  rehabId?: CreateRehabNoArv['createRehabNoArv']['rehabId'];
  rehabItemPackageId?: CreateRehabNoArv['createRehabNoArv']['rehabItemPackage']['id'];
  selectedPhotos?: string[];
  // From CreateRehab itself after create Rehab
  revisedRehabInfo?: RevisedRehabInfo;
  // From RehabRecordsDetailScreen due to Revise button
  flow?: "revise" | 1;
};

type ScreenProps = {};

export type CreateRehabViewProps = {};

const CREATE_REHAB_NO_ARV = gql`
  mutation CreateRehabNoArv($input: CreateRehabNoArvInput!) {
    createRehabNoArv(input: $input) {
      arv
      postalCode
      rehabId
      rehabItemPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
          unit
          costPerUnit
          custom
          calculationMethod
          order
          id
          roomName
          measurement
          measurementUnit
          notes
        }
        submitted
        taxRate
      }
    }
  }
`;

const UPDATE_REHAB_ITEMS_PACKAGE = gql`
  mutation UpdateRehabItemsPackage($input: UpdateRehabItemsPackageInput!) {
    updateRehabItemsPackage(input: $input) {
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
          selected
          unit
          costPerUnit
          custom
          calculationMethod
          order
          id
          roomName
          measurement
          measurementUnit
          notes
        }
        submitted
        taxRate
      }
      rehabRequest {
        id
        arv
        postalCode
      }
    }
  }
`;

const CreateRehab: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const createRehabNoArvInput = navigation.getParam("createRehabNoArvInput", null);
  const flow = navigation.getParam("flow", 1);
  const rehabId = navigation.getParam("rehabId", "");
  const rehabItemPackageId = navigation.getParam("rehabItemPackageId", "");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);

  // State management for Full Remodel Summary and Profit Summary
  const { arv, asIs, totalDebts, vacant} = createRehabNoArvInput;
  const [, dispatch] = useCreateRehabState();

  const [createRehabNoArv, { error: createRehabNoArvError }] = useMutation<CreateRehabNoArv, CreateRehabNoArvVariables>(CREATE_REHAB_NO_ARV, {
    onCompleted: (data) => {
      if (!createRehabNoArvError && data && data.createRehabNoArv) {
        const result = data.createRehabNoArv;
        const _rehabItemCatergoriesMap = getRehabItemCatergoriesMap(result.rehabItemPackage.rehabItems);
        const taxRate = result?.rehabItemPackage?.taxRate || 0;
        const _remodellingCost = calculateRemodelingCost(result.rehabItemPackage.rehabItems);
        const rehabId = result.rehabId;
        const rehabItemsPackageId = result.rehabItemPackage.id;
        const _rehabItems = result.rehabItemPackage.rehabItems.map(item => (omit(item, ["__typename"])));
        const _initalState = {
          arv, 
          asIs, 
          rehabId,
          rehabItemsPackageId,
          taxRate,
          totalDebts,
          vacant,    
          remodellingCost: _remodellingCost, 
          rehabItems: _rehabItems,
          rehabItemCatergoriesMap: _rehabItemCatergoriesMap,
        };
        dispatch({ type: 'UPDATE_ALL', newState: _initalState });
         // For revise flow
        const revisedRehabInfo = {
          arv,
          asIs,
          totalDebts,
          vacant,
          address: createRehabNoArvInput.address,
          contactPhoneNumber: createRehabNoArvInput.contactPhoneNumber,
          propertyDetails: getDefaultPropertyDetails(getDefaultPropertyInfoFields()),
          postalCode: result.postalCode,
        };
        navigation.navigate("FullRemodelSummaryScreen", { 
          rehabId, 
          rehabItemPackageId: rehabItemsPackageId, 
          revisedRehabInfo,
        });
      } 
    },
  });

  const [updateRehabItemsPackage, { error: updateRehabItemsPackageError }] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE, {
    onCompleted: (data) => {
      if (!updateRehabItemsPackageError && data && data.updateRehabItemsPackage) {
        const result = data.updateRehabItemsPackage;
        const _rehabItemCatergoriesMap = getRehabItemCatergoriesMap(result.rehabItemsPackage.rehabItems);
        const taxRate = result?.rehabItemsPackage?.taxRate || 0;
        const _remodellingCost = calculateRemodelingCost(result?.rehabItemsPackage?.rehabItems);
        const rehabId = result.rehabRequest.id;
        const rehabItemsPackageId = result.rehabItemsPackage.id;
        const _rehabItems = result.rehabItemsPackage.rehabItems.map(item => (omit(item, ["__typename"])));
        const _initalState = {
          arv, 
          asIs, 
          rehabId,
          rehabItemsPackageId,
          taxRate,
          totalDebts,
          vacant,    
          remodellingCost: _remodellingCost,
          rehabItems: _rehabItems,
          rehabItemCatergoriesMap: _rehabItemCatergoriesMap,
        };
        dispatch({ type: 'UPDATE_ALL', newState: _initalState });
         // For revise flow
        const revisedRehabInfo = {
          arv,
          asIs,
          totalDebts,
          vacant,
          address: createRehabNoArvInput.address,
          contactPhoneNumber: createRehabNoArvInput.contactPhoneNumber,
          propertyDetails: getDefaultPropertyDetails(getDefaultPropertyInfoFields()),
          postalCode: result.rehabRequest.postalCode,
        };

        navigation.navigate("FullRemodelSummaryScreen", { 
          flow,
          rehabId, 
          rehabItemPackageId: rehabItemsPackageId, 
          revisedRehabInfo,
          keyCreateRehabScreen: navigation.state.key
        });
      } 
    },
  });

  const bootstrapAsync = async () => {
    try {
      let images = [];
      if (selectedPhotos.length) {
        images = await uploadPhotos(rehabId, selectedPhotos);
      };
      if (!rehabId) {
        await createRehabNoArv({ variables: { input: { ...createRehabNoArvInput, images } }});
      } else {
        const updateRehabItemsPackageInput = {
          rehabRequest: {
            images,
            id: rehabId,
            ...createRehabNoArvInput
          },
          rehabItemsPackage: {
            id: rehabItemPackageId
          }
        };
        await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      };
    } catch (e) {
      console.log("createRehab error", e)
    }
  };

  React.useEffect(() => {
    // console.log("CreateRehab Mount");
    bootstrapAsync();
    return () => {
      // console.log("CreateRehab UnMount");
    }
  }, []);

  return (
    <CreateRehabView />
  )
};

export default React.memo(CreateRehab);