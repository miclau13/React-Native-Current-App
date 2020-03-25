import { gql } from 'apollo-boost';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useMutation } from '@apollo/react-hooks';

import CameraPhotoUploadView from './CameraPhotoUploadView';
import { LoadingComponent } from '../InitialLoading';
import { uploadPhotos } from '../../common/utils/UploadImages';
import { UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables } from '../../generated/UpdateRehabItemsPackage';

type Params = {
  rehabId: string;
  selectedPhotos: string[];
  loading?: boolean;
};

type ScreenProps = {};

const UPDATE_REHAB_ITEMS_PACKAGE = gql`
  mutation UpdateRehabItemsPackage($input: UpdateRehabItemsPackageInput!) {
    updateRehabItemsPackage(input: $input) {
      rehabItemsPackage {
        id
        rehabItems {
          category
          cost
          name
        }
      }
      rehabRequest {
        id
        address
        asIs
        arv
      }
    }
  }
`;

export interface CameraPhotoUploadViewProps {
  status: string;
};

const CameraPhotoUpload: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");
  const selectedPhotos = navigation.getParam("selectedPhotos", []);

  const [updateRehabItemsPackage] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const boostrapAsync = async () => {
    try {
      setLoading(true);
      const images = await uploadPhotos(rehabId, selectedPhotos);
      await updateRehabRequest(images);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  
  const updateRehabRequest = async (images: string[]) => {
    const updateRehabItemsPackageInput = {
      rehabRequest: {
        images,
        id: rehabId,
      }
    };
    try {
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      if (result) {
        setStatus("Photos Uploaded Successfully!");
        navigation.setParams({ loading: false })
      };
    } catch (e) {
      console.log("ProfitSummary handleSaveOnPress e", e);
    }
  };

  React.useEffect(() => {
    boostrapAsync();
    return () => {}
  }, []);

  if (loading) {
    return <LoadingComponent />;
  };

  return (
    <CameraPhotoUploadView status={status} />
  )
};

export default React.memo(CameraPhotoUpload);