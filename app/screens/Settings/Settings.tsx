import React from 'react';
import { Button, Platform, Text, View } from 'react-native';
import { NavigationScreenProps } from "react-navigation";

import styles from './styles';

export interface SettingsProps extends NavigationScreenProps {

};

const Settings: React.SFC<SettingsProps> = (props) => {
  const { navigation: { navigate } } = props;
  const handleButtonOnPress = () => navigate("LoginScreen");
  return (
    <View style={styles.container}>
      <Text>This is the Settings.</Text>
      <Button
        title="Logout"
        onPress={handleButtonOnPress}
      />
    </View>
  )
};

export default Settings;