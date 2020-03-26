import * as ImageManipulator from 'expo-image-manipulator';

// For compression
const getCompressedImages = async (assets: Array<string>) => Promise.all(assets.map(async (uri) => {
  const manipResult = await ImageManipulator.manipulateAsync(uri, [], { compress: 0 });
  return manipResult.uri;
})); 

// For Upload 
const uploadImagesAsync = async (rehabId: string, uriArray: string[]) => {
  let apiUrl = 'https://agent.trudeed.com/blobUpload/images';
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

export const uploadPhotos = async (rehabId: string, selectedPhotos: string[]) => {
  try {
    const compressedSelectedPhotos = await getCompressedImages(selectedPhotos);
    const uploadResponse = await uploadImagesAsync(rehabId, compressedSelectedPhotos);
    const uploadResult = await uploadResponse.json();
    return uploadResult;
  } catch(error) {
    console.log("uploadPhotos error", error)
  }
};