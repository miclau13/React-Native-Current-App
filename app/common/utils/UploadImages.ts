import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-media-library';

// For compression
const getCompressedImages = async (assets: Array<Asset>) => Promise.all(assets.map(async (asset) => {
  const ratio = 2 / 5;
  const width = asset.width * ratio;
  const height = asset.height * ratio;
  const manipResult = await ImageManipulator.manipulateAsync(asset.uri, [{ resize: { width, height } }], { compress: 0.1 });
  // const manipResult = await ImageManipulator.manipulateAsync(asset.uri, [], { compress: 0 });
  return manipResult.uri;
})); 

// For Upload 
const uploadImagesAsync = async (rehabId: string, uriArray: string[]) => {
  let apiUrl = 'https://dev-agent.trudeed.com/blobUpload/images';
  // let apiUrl = 'http://192.168.0.106:3000/blobUpload/images';
  let formData = new FormData();
  uriArray.forEach(uri => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let fileParts = uri.split('/');
    let fileName = fileParts[fileParts.length - 1];
    const result = {
      uri,
      name: `${fileName}`,
      type: `image/${fileType}`
    };
    // TODO check type
    formData.append('photos', result);
  });
  formData.append('password', 'trudeed@2019');
  formData.append('rehabId', rehabId);

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  
  return fetch(apiUrl, options);
};

export const uploadPhotos = async (rehabId: string, selectedPhotos: Asset[]) => {
  try {
    const compressedSelectedPhotos = await getCompressedImages(selectedPhotos);
    const uploadResponse = await uploadImagesAsync(rehabId, compressedSelectedPhotos);
    const uploadResult = await uploadResponse.json();
    return uploadResult;
  } catch(error) {
    console.log("uploadPhotos error", error)
  }
};