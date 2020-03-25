import * as MediaLibrary from 'expo-media-library';
import { useState, useCallback } from 'react';

type UseCameraRollHook = (options: MediaLibrary.AssetsOptions) => 
  [UseCameraRollState['photos'], UseCameraRollState['getPhotos']];

export type UseCameraRollState = {
  photos: MediaLibrary.Asset[];
  getPhotos: () => Promise<void>;
};

const useCameraRoll: UseCameraRollHook = ({ first = 40 }) => {
  const [photos, setPhotos] = useState<UseCameraRollState['photos']>([]);
  const [after, setAfter] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getPhotos = useCallback<UseCameraRollState['getPhotos']>(async () => {
    if (!hasNextPage) return;
    const { assets, endCursor, hasNextPage: _hasNextPage } = await MediaLibrary.getAssetsAsync({
      first,
      ...(after && { after }),
    });
    if (after === endCursor) return;

    const images = assets;
    setPhotos([...photos, ...images]);
    setAfter(endCursor);
    setHasNextPage(_hasNextPage);
  }, [after, hasNextPage, photos]);

  return [photos, getPhotos];
};

export default useCameraRoll;