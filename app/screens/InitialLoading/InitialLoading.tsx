import React, { useEffect} from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationStackScreenProps } from "react-navigation-stack";

import styles from './styles';
import LoggedInContext from '../../common/LoggedInContext';

type Params = {};

type ScreenProps = {};

const InitialLoading: React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> = (props) => {
  const { navigation } = props;

  const loggedIn = React.useContext(LoggedInContext);
  console.log("loggedIn",loggedIn)

  const bootstrapAsync = async () => {
    if (loggedIn) {
      navigation.navigate("MainNavigator");
    } else {
      navigation.navigate("AuthTabs");
    };
  }

  useEffect(() => {
    // TODO dont use setTImeout
    setTimeout(bootstrapAsync, 0.01);
    return () => {}
  });

  return (
    <LoggedInContext.Consumer>
      {loggedIn => (
        <LoadingComponent loggedIn={loggedIn} />
      )}
    </LoggedInContext.Consumer>
  )
};

const LoadingComponent = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

export default React.memo(InitialLoading);