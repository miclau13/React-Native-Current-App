import React from 'react';

import CameraPhotoView from './CameraPhotoView';
import { CameraPhotoProps } from '../CameraPhotoReview'; 

export interface CameraPhotoViewProps {
  photo: CameraPhotoProps['photo'];
};

const CameraPhoto: React.ComponentType<CameraPhotoProps> = (props) => {
  const { photo } = props;

  return (
    <CameraPhotoView 
      photo={photo}
    />
  )
};

export default React.memo(CameraPhoto);