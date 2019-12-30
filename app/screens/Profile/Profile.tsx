import { gql } from 'apollo-boost';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useQuery } from '@apollo/react-hooks';

import ProfileView from './ProfileView';
import { LoadingComponent } from '../InitialLoading';

const VIEWER = gql`
  query Viewer {
    viewer {
      id
      givenName
      familyName
      picture
      email
      phoneNumber
      address
    }
  }
`;

type Params = {};

type ScreenProps = {};

// const address = "Hong Kong, China";
// const avatar = "https://pbs.twimg.com/profile_images/909953369694859265/BOakwKQY_400x400.jpg";
// const avatarBackground = "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png"
// const tels = [
//   { "id": 1, "name": "Mobile", "number": "+66 (089)-928-2134" },
//   // { "id": 2, "name": "Work", "number": "+41 (112)-435-9887" }
// ];
// const emails = [
//   { "id": 1, "name": "Personal", "email": "elsie-goodman@mail.com" },
//   // { "id": 2, "name": "Work", "email": "elsie@work.com" }
// ];
// const name = "Michael Lau";

const Profile: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, error, loading, refetch } = useQuery(VIEWER);

  const address = error ? "Please Re-login" : data && data.viewer ? data.viewer.address : "(TBC)";
  const avatar =error ? "Please Re-login" : data && data.viewer ? data.viewer.picture : null;
  const avatarBackground = "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png"
  const tels = [
    { "id": 1, "name": "Mobile", "number": error ? "Please Re-login" : data && data.viewer ? data.viewer.phoneNumber : "(TBC)" },
    // { "id": 2, "name": "Work", "number": "+41 (112)-435-9887" }
  ];
  const emails = [
    { "id": 1, "name": "Personal", "email": error ? "Please Re-login" : data && data.viewer ? data.viewer.email : "(TBC)" },
    // { "id": 2, "name": "Work", "email": "elsie@work.com" }
  ];
  const name = error ? "Please Re-login" : data && data.viewer ? `${data.viewer.givenName} ${data.viewer.familyName}`: "(TBC)";

  const signOutAsync = async () => {
    await SecureStore.deleteItemAsync("accessToken", {});
    navigation.navigate("AuthTabs");
  }
  const handleLogOutOnPress = () => signOutAsync();

  const handleRefetch = async () => {
    await refetch();
  }
  React.useEffect(() => {
    console.log("Profile Mount");
    return () => {console.log("Profile UnMount");}
  });
  React.useEffect(() => {
    console.log("Profile refetch mount");
    handleRefetch();
    return () => {console.log("Profile refetch UnMount");}
  }, []);

  if (loading) {
    return (
      <LoadingComponent />
    );
  };

  return (
    <ProfileView 
      address={address} 
      avatar={avatar} 
      avatarBackground={avatarBackground}
      emails={emails}
      handleLogOutOnPress={handleLogOutOnPress}
      name={name}
      tels={tels}
    />
  )
};

export default React.memo(Profile);