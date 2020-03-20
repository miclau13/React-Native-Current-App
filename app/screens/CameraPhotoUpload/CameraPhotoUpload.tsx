import { gql } from 'apollo-boost';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useMutation } from '@apollo/react-hooks';

import CameraPhotoUploadView from './CameraPhotoUploadView';
import { LoadingComponent } from '../InitialLoading';
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
  const selectedPhotos = navigation.getParam("selectedPhotos");
  console.log("rehabId", rehabId)

  const [updateRehabItemsPackage] = useMutation<UpdateRehabItemsPackage, UpdateRehabItemsPackageVariables>(UPDATE_REHAB_ITEMS_PACKAGE);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const boostrapAsync = async () => {
    try {
      setLoading(true);
      const images = await uploadPhotos();
      await updateRehabRequest(images);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // For Upload 
  const uploadImagesAsync = async (uriArray: string[]) => {
    let apiUrl = 'https://dev-agent.trudeed.com/blobUpload/images';
    let formData = new FormData();
    uriArray.forEach(uri => {
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let fileParts = uri.split('/');
      let fileName = fileParts[fileParts.length - 1];
      const result = {
        uri,
        name: `${fileName}`,
        type: `image/${fileType}`};
      // TODO check type
      formData.append('photos', result);
    });
    formData.append('password', 'trudeed@2019');
  
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    
    return fetch(apiUrl, options);
  }
  const uploadPhotos = async () => {
    try {
      const uploadResponse = await uploadImagesAsync(selectedPhotos);
      console.log(" uploadPhotos uploadResponse", uploadResponse)
      const uploadResult = await uploadResponse.json();
      console.log(" uploadPhotos uploadResult", uploadResult);
      return uploadResult;
    } catch(error) {
      console.log("uploadPhotos error", error)
    }
  };
  
  const updateRehabRequest = async (images: string[]) => {
    console.log("updateRehabRequest images",images)
    const updateRehabItemsPackageInput = {
      rehabRequest: {
        images,
        id: rehabId,
      }
    };
    try {
      const result = await updateRehabItemsPackage({ variables: { input: updateRehabItemsPackageInput } });
      console.log("result?.data?.updateRehabItemsPackage",result?.data?.updateRehabItemsPackage)
      if (result) {
        setStatus("Uploaded Photos Successfully!");
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