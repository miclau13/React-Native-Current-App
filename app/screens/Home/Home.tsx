import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import { strings as currentLocationStrings } from "../CurrentLocation";
import { strings as optionStrings } from "../Options";
import { strings as BathroomRemodelStrings } from "../BathroomRemodelForm";
import BathroomRemodelCard from '../../components/BathroomRemodelCard';
import FloorRemodelCard from '../../components/FloorRemodelCard';
import KitchenRemodelCard from '../../components/KitchenRemodelCard';
import ZipCode from '../ZipCode';
import BathroomRemodel from '../BathroomRemodel';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  // const name = navigation.getParam('name', 'Guess');
  // const profilePictureUri = navigation.getParam('profilePictureUri', '')
  const handleBathroomRemodelButtonOnPress = React.useCallback<CardProps['onPress']>(
    () => navigation.navigate("BathroomRemodelQuestionsStack", { choice: "BathroomRemodel", nextQuestionScreen: "zipCode" }, NavigationActions.navigate({ routeName: "BathroomRemodelFormScreen"}) )
  , [navigation.navigate]);
  const handleKitchenRemodelButtonOnPress = React.useCallback<CardProps['onPress']>(
    () => navigation.push("BathroomRemodelFormScreen", { questionScreen: ZipCode, choice: "KitchenRemodel" })
  , [navigation.push]);
  // const handleOptionsButtonOnPress = () => navigate("OptionsScreen");
  // const handleCurrentLocationButtonOnPress = () => navigate("CurrentLocationScreen");
  return (
    <View style={styles.container}>
      {/* <Text>This is the Home.</Text>
      <Text>{`Welcome back ${name}`}</Text> */}
      <BathroomRemodelCard onPress={handleBathroomRemodelButtonOnPress} elevation={5} />
      <View style={styles.viewBox1} />
      <KitchenRemodelCard onPress={handleKitchenRemodelButtonOnPress} elevation={5} />
      {/* <View style={styles.viewBox1} />
      <FloorRemodelCard onPress={handleKitchenRemodelButtonOnPress} elevation={5} /> */}
      
      {/* <BathroomRemodelCard onButtonPress={handleBathroomRemodelButtonOnPress} /> */}
      {/* <Button title={BathroomRemodelStrings.title} onPress={handleBathroomRemodelButtonOnPress} /> */}
      {/* <Button title={currentLocationStrings.currentLocationTitle} onPress={handleCurrentLocationButtonOnPress} />
      <Button title={optionStrings.optionsTitle} onPress={handleOptionsButtonOnPress} /> */}
    </View>
  )
};

export default Home;