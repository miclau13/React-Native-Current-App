import React from 'react';
import { Text, View } from 'react-native';

import styles from "./styles";
// import { strings as loginStrings } from "../../screens/Login";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {
  DrawerItems,
  NavigationInjectedProps,
  SafeAreaView,
  withNavigation
} from "react-navigation";

export interface BurgerMenuProps {

};

const BuergerMenu: React.SFC<BurgerMenuProps> = (props) => {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
      <ScrollView>
        <DrawerItems {...this.props} />
      </ScrollView>
      <Button
        icon={{ name: "md-log-out", type: "ionicon" }}
        // title={loginStrings.logOut}
        iconContainerStyle={styles.icon}
        buttonStyle={styles.button}
        titleStyle={styles.title}
        onPress={() => this.props.navigation.navigate("LoginScreen")}
      />
    </SafeAreaView>
  )
};

export default BuergerMenu;