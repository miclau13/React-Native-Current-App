import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
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

  const handleBathroomRemodelButtonOnPress = React.useCallback<CardProps['onPress']>(
    () => navigation.push("BathroomRemodelFormScreen", { remodelType: "bathroomRemodel", step: "zipCode", previousStep: "home" })
  , [navigation.push]);
  const handleKitchenRemodelButtonOnPress = React.useCallback<CardProps['onPress']>(
    () => navigation.push("KitchenRemodelFormScreen", { remodelType: "kitchenRemodel", step: "zipCode", previousStep: "home" })
  , [navigation.push]);

  React.useEffect(() => {
    console.log("Home Mount");
    return () => {
      console.log("Home UnMount");
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>This is the Home.</Text>
      <Text>{`Welcome back ${name}`}</Text> */}
      <BathroomRemodelCard onPress={handleBathroomRemodelButtonOnPress} elevation={5} />
      <View style={styles.viewBox1} />
      <KitchenRemodelCard onPress={handleKitchenRemodelButtonOnPress} elevation={5} />
    </View>
  )
};

export default React.memo(Home);