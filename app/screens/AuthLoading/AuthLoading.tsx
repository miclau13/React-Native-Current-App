import * as SecureStore from 'expo-secure-store';
import React, { useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import config from '../../../config';

import bath from '../../../assets/bathroom_remodel.jpeg';
import * as FileSystem from 'expo-file-system';
export const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BathroomRemodelFormValues } from '../BathroomRemodelForm';
import { omit } from 'lodash';

type Params = {
  formValues?: BathroomRemodelFormValues;
  redirectTo?: string;
  selectedPhotos?: string[];
};

type ScreenProps = {};

const VIEWER = gql`
  {
    viewer {
      id
      givenName
      familyName
      picture
      gender
      email
      login
    }
  }
`;

const AuthLoading: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;

  const formValues = navigation.getParam("formValues", null);
  const redirectTo = navigation.getParam("redirectTo", "HomeScreen");
  const selectedPhotosUriArray = navigation.getParam("selectedPhotos", []);

  const uploadImagesAsync = async (uriArray: string[]) => {
    let apiUrl = 'https://dev-agent.trudeed.com/blobUpload/images';
    // let apiUrl = 'http://192.168.26.184:3000/blobUpload/images';
    let formData = new FormData();
    uriArray.forEach(uri => {
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let fileParts = uri.split('/');
      let fileName = fileParts[fileParts.length - 1];
      const result = {
        uri,
        //   name: `photo.${fileType}`,
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
    // Instead of all saved phtos, used selected photos
    // const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
    // for local device testing
    // const photosFullUri = photos.map(uri => (`${PHOTOS_DIR}/${uri}`)).filter(uri => {
    //   let uriParts = uri.split('.');
    //   let fileType = uriParts[uriParts.length - 1];
    //   return fileType === "jpeg"
    // });
    // const photosFullUri = photos.map(uri => (`${PHOTOS_DIR}/${uri}`)).filter(uri => {
    //   let uriParts = uri.split('.');
    //   let fileType = uriParts[uriParts.length - 1];
    //   return fileType === "jpg";
    // });
    // console.log("photos", photos)
    // console.log(photosFullUri)
    // console.log("Auth loading selectedPhotosUriArray uploadPhotos", selectedPhotosUriArray)
    try {
      const uploadResponse = await uploadImagesAsync(selectedPhotosUriArray);
      // console.log("AuthLoading uploadPhotos uploadResponse", uploadResponse)
      const uploadResult = await uploadResponse.json();
      // console.log("AuthLoading uploadPhotos uploadResult", uploadResult);
      return uploadResult;
    } catch(error) {
      console.log("AuthLoading uploadPhotos error", error)
    }
  }

  const bootstrapAsync = async () => {
    const images = await uploadPhotos();
    // const images = ["https://innodeedevappdocs.blob.core.windows.net/rehab-images/1803%2F1572788094388.jpg_fdc1b8f1-5400-4189-8540-47b7653e6b71"]
    // console.log("AuthLoading bootstrapAsync formValues",formValues)
    // console.log("AuthLoading bootstrapAsync images",images)
    const createRehabInput = {
      images,
      postalCode: formValues.zipCode,
      package: omit(formValues, ["zipCode"])
    }
    navigation.navigate(redirectTo, { createRehabInput });
  }
  useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
};

export default React.memo(AuthLoading);