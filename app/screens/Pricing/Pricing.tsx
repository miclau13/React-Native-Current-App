import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useMutation } from '@apollo/react-hooks';

import styles from './styles';

type Params = {
  createRehabInput?: object;
};

type ScreenProps = {};

const CREATE_REHAB = gql`
  mutation CreateRehab($input: CreateRehabInput!) {
    createRehab(input: $input) {
      id
      rehabItems {
        id
        cost
      }
    }
  }
`;

const Pricing: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [createRehab] = useMutation(CREATE_REHAB);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const [data, setData] = React.useState(null);

  const bootstrapAsync = async () => {
    try {
      const result = await createRehab({ variables: { input: createRehabInput } });
      if (result) {
        const totalCost = result.data.createRehab.rehabItems.reduce((accumulator, item) => {
          return accumulator + item.cost;
        }, 0)
        setData(totalCost)
        // console.log("result", result)
      }
    } catch (e) {
      console.log("createRehab e", e)
    }
    
  }

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      {!data ?
        <>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </>
        :
        <Text>{`The estimated price is $${data}`}</Text>
      }
      
    </View>
  )
};

export default React.memo(Pricing);