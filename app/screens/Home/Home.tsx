import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import { strings as currentLocationStrings } from "../CurrentLocation";
// import { strings as detailStrings } from "../Detail";
import { strings as optionStrings } from "../Options";
import { strings as BathroomRemodelStrings } from "../BathroomRemodel";

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;
  const name = navigation.getParam('name', 'Guess');
  const profilePictureUri = navigation.getParam('profilePictureUri', '');
  // const handleDetailButtonOnPress = () => navigate("DetailScreen");
  const handleBathroomRemodelButtonOnPress = () => navigate("BathroomRemodelScreen");
  const handleOptionsButtonOnPress = () => navigate("OptionsScreen");
  const handleCurrentLocationButtonOnPress = () => navigate("CurrentLocationScreen");
  return (
    <View style={styles.container}>
      <Text>This is the Home.</Text>
      <Text>{`Welcome back ${name}`}</Text>
      <Image source={{ uri: profilePictureUri }} style={{width: 400, height: 400}} />
      <Button title={BathroomRemodelStrings.title} onPress={handleBathroomRemodelButtonOnPress} />
      {/* <Button title={detailStrings.detailTitle} onPress={handleDetailButtonOnPress} /> */}
      <Button title={currentLocationStrings.currentLocationTitle} onPress={handleCurrentLocationButtonOnPress} />
      <Button title={optionStrings.optionsTitle} onPress={handleOptionsButtonOnPress} />
    </View>
  )
};

export default Home;