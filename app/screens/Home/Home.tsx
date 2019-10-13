import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import { strings as currentLocationStrings } from "../CurrentLocation";
import { strings as optionStrings } from "../Options";
import { strings as BathroomRemodelStrings } from "../BathroomRemodel";
import BathroomRemodelCard from '../../components/BathroomRemodelCard';
import KitchenRemodelCard from '../../components/KitchenRemodelCard';
import ZipCode from '../ZipCode';
import MaintainFloor from '../MaintainFloor';

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
  const handleBathroomRemodelButtonOnPress: CardProps['onPress'] = () => navigate("BathroomRemodelScreen", { questionScreen: ZipCode });
  const handleOptionsButtonOnPress = () => navigate("OptionsScreen");
  const handleCurrentLocationButtonOnPress = () => navigate("CurrentLocationScreen");
  return (
    <View style={styles.container}>
      {/* <Text>This is the Home.</Text>
      <Text>{`Welcome back ${name}`}</Text> */}
      <BathroomRemodelCard onPress={handleBathroomRemodelButtonOnPress} elevation={5} />
      <View style={styles.viewBox1} />
      <KitchenRemodelCard onPress={handleBathroomRemodelButtonOnPress} elevation={5} />
      
      {/* <BathroomRemodelCard onButtonPress={handleBathroomRemodelButtonOnPress} /> */}
      {/* <Button title={BathroomRemodelStrings.title} onPress={handleBathroomRemodelButtonOnPress} /> */}
      {/* <Button title={currentLocationStrings.currentLocationTitle} onPress={handleCurrentLocationButtonOnPress} />
      <Button title={optionStrings.optionsTitle} onPress={handleOptionsButtonOnPress} /> */}
    </View>
  )
};

export default Home;