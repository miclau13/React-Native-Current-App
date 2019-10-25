import * as SecureStore from 'expo-secure-store';
import React, { useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import * as Azure from '@azure/storage-blob';

import styles from './styles';
import config from '../../../config';

import bath from '../../../assets/bathroom_remodel.jpeg';
import * as FileSystem from 'expo-file-system';
export const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

type Params = {
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
  const redirectTo = navigation.getParam("redirectTo", "HomeScreen");
  const selectedPhotosUriArray = navigation.getParam("selectedPhotos", []);
  const { loading, error, data } = useQuery(VIEWER);
  console.log("Auth loading FileSystem.documentDirectory", FileSystem.documentDirectory)

  const uploadImagesAsync = async (uriArray: string[]) => {
    // let apiUrl = 'https://dev-agent.trudeed.com/blobUpload';
    let apiUrl = 'http://localhost:3000/blobUpload/images';
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
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
    const photosFullUri = photos.map(uri => (`${PHOTOS_DIR}/${uri}`)).filter(uri => {
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      return fileType === "jpeg"
    });
    // console.log(photosFullUri)
    try {
      // const uploadResponse = await uploadImagesAsync(photosFullUri);
      // const uploadResult = await uploadResponse.json();
      // console.log("AuthLoading uploadPhotos uploadResult", uploadResult)
    } catch(error) {
      console.log("AuthLoading uploadPhotos error", error)
    }
  }

  const bootstrapAsync = async () => {
    // await uploadPhotos();
    // TODO Change to viewer from backend, check the expiration time
    // const accessToken = await SecureStore.getItemAsync("accessToken", {});
    // if (accessToken) {
    //   navigation.navigate(redirectTo);
    // } else {
    //   navigation.navigate("LoginScreen");
    // }

    
    console.log("AuthLoading uploadPhotos data", data)
    console.log("AuthLoading uploadPhotos error", error)
    console.log("AuthLoading uploadPhotos loading", loading)
  }
  useEffect(() => {
    data && bootstrapAsync();
  }, [data]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
};

export default React.memo(AuthLoading);