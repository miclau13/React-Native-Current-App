import React from 'react';
import { ButtonProps, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import { strings as currentLocationStrings } from "../CurrentLocation";
import { strings as optionStrings } from "../Options";
import { strings as BathroomRemodelStrings } from "../BathroomRemodel";
import BathroomRemodelCard from '../../components/BathroomRemodelCard';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;
  const name = navigation.getParam('name', 'Guess');
  const profilePictureUri = navigation.getParam('profilePictureUri', '')
  const handleBathroomRemodelButtonOnPress: ButtonProps['onPress'] = () => navigate("BathroomRemodelScreen");
  const handleOptionsButtonOnPress = () => navigate("OptionsScreen");
  const handleCurrentLocationButtonOnPress = () => navigate("CurrentLocationScreen");
  return (
    <View style={styles.container}>
      {/* <Text>This is the Home.</Text>
      <Text>{`Welcome back ${name}`}</Text> */}
      <BathroomRemodelCard onButtonPress={handleBathroomRemodelButtonOnPress}>
      </BathroomRemodelCard>
      {/* <Button title={BathroomRemodelStrings.title} onPress={handleBathroomRemodelButtonOnPress} /> */}
      {/* <Button title={currentLocationStrings.currentLocationTitle} onPress={handleCurrentLocationButtonOnPress} />
      <Button title={optionStrings.optionsTitle} onPress={handleOptionsButtonOnPress} /> */}
    </View>
  )
};

export default Home;