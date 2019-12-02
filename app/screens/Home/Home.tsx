import React from 'react';
import { View } from 'react-native';
import { CardProps } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import styles from './styles';
import FiximizeQuestionsCard from '../../components/FiximizeQuestions/FiximizeQuestionsCard';

type Params = {
  name?: string;
  profilePictureUri?: string;
};

type ScreenProps = {};

const Home: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;

  const handleFiximizeQuestionsButtonOnPress = React.useCallback<CardProps['onPress']>(
    // () => navigation.push("FiximizeQuestionsFormScreen", { step: "address", previousStep: "home" })
    () => navigation.push("FullRemodelSummaryScreen", { step: "address", previousStep: "home" })
  , [navigation.push]);

  React.useEffect(() => {
    console.log("Home Mount");
    return () => {
      console.log("Home UnMount");
    }
  }, []);

  return (
    <View style={styles.container}>
      <FiximizeQuestionsCard onPress={handleFiximizeQuestionsButtonOnPress} elevation={5} />
    </View>
  )
};

export default React.memo(Home);