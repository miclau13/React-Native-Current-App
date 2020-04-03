import { gql } from 'apollo-boost';
import React from 'react';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import CameraPhotoReviewView from './CameraPhotoReviewView';
import { LoadingComponent } from '../InitialLoading';

type Params = {
  rehabId: string;
};

type ScreenProps = {};

const REHAB_REQUEST = gql`
  query RehabRequest($query: String!) {
    rehabRequest(query: $query) {
      id
      images
    }
  }
`

type Photo = {
  id: string;
  uri: string;
}

export interface CameraPhotoReviewViewProps {
  photos: Photo[];
};

export interface CameraPhotoProps {
  photo: Photo;
};

const CameraGallery: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");
  const [photos, setPhotos] = React.useState([]);
  const { data, loading, refetch } = useQuery(REHAB_REQUEST, {
    variables: {
      query: rehabId,
    },
    onCompleted: (data) => {
      if (data && data?.rehabRequest) {
        const _photos = (data.rehabRequest.images || []).map((image, index) => ({
          id: index,
          uri: image,
        }))
        setPhotos(_photos);
        // console.log("data", data)
      };
    },
  });

  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <CameraPhotoReviewView 
      // getCameraRollPhotos={getCameraRollPhotos}
      photos={photos}
      // togglePhotoSelection={togglePhotoSelection}
    />
  )
};

export default React.memo(CameraGallery);