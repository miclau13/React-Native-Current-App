import React from 'react';
import { Text, View } from 'react-native';
import { Button } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";

import styles from './styles';
import { strings as currentLocationStrings } from "../CurrentLocation";
import { strings as detailStrings } from "../Detail";
import { strings as optionStrings } from "../Options";

export interface HomeProps extends NavigationScreenProps {

};

const Home: React.SFC<HomeProps> = (props) => {
  const { navigation: { navigate } } = props;
  const handleDetailButtonOnPress = () => navigate("DetailScreen");
  const handleOptionsButtonOnPress = () => navigate("OptionsScreen");
  const handleCurrentLocationButtonOnPress = () => navigate("CurrentLocationScreen");
  return (
    <View style={styles.container}>
      <Text>This is the Home.</Text>
      <Button title={detailStrings.detailTitle} onPress={handleDetailButtonOnPress} />
      <Button title={currentLocationStrings.currentLocationTitle} onPress={handleCurrentLocationButtonOnPress} />
      <Button title={optionStrings.optionsTitle} onPress={handleOptionsButtonOnPress} />
    </View>
  )
};

export default Home;