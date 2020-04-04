import { gql } from 'apollo-boost';
import React from 'react';
import { FlatListProps } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import CameraPhotoReviewView from './CameraPhotoReviewView';
import { LoadingComponent } from '../InitialLoading';
import { RehabRequest, RehabRequestVariables } from '../../generated/RehabRequest';

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
  isRefreshing: boolean;
  onRefresh: FlatListProps<Photo>['onRefresh'];
  photos: Photo[];
};

export interface CameraPhotoProps {
  photo: Photo;
};

const CameraPhotoReview: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const rehabId = navigation.getParam("rehabId");

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);

  const { data, loading, refetch } = useQuery<RehabRequest, RehabRequestVariables>(REHAB_REQUEST, {
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

  const onRefresh: CameraPhotoReviewViewProps['onRefresh'] = async () => {
    setIsRefreshing(true); // true isRefreshing flag for enable pull to refresh indicator
    try {
      const { data } = await refetch({ query: rehabId });
      if (data && data?.rehabRequest && data?.rehabRequest?.images) {
        if (data.rehabRequest.images.length !== photos.length) {
          const _photos = (data.rehabRequest.images || []).map((image, index) => ({
            id: index,
            uri: image,
          }))
          setPhotos(_photos);
        }
      };
    } catch (error) {
      console.log("refetch error", error)
    };
    setIsRefreshing(false);
  }

  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <CameraPhotoReviewView 
      // getCameraRollPhotos={getCameraRollPhotos}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      photos={photos}
      // togglePhotoSelection={togglePhotoSelection}
    />
  )
};

export default React.memo(CameraPhotoReview);