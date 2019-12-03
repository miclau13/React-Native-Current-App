import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
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
      arv
      rehabItemPackage {
        rehabItems {
          category
          cost
          name
        }
      }
    }
  }
`;

const FullRemodelSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const [createRehab] = useMutation(CREATE_REHAB);
  const createRehabInput = navigation.getParam("createRehabInput", null);
  const [data, setData] = React.useState();

  const bootstrapAsync = async () => {
    try {
      const result = await createRehab({ variables: { input: createRehabInput } });
      if (result) {
        const itemsMap = result.data.createRehab.rehabItemPackage.rehabItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = item.cost;
          } else {
            acc[item.category] += item.cost;
          }
          return acc;
        }, {});
        let dataArry = [];
        for (let [key, value] of Object.entries(itemsMap)) {
          dataArry.push({ category: key, value, checked: true  });
        }
        setData(dataArry);
      }
    } catch (e) {
      console.log("createRehab e", e)
    }
  };

  const handleCheckBoxOnPress = React.useCallback((i) => () => {
    const result = data.map((item, index) => {
      if (index === i) {
        item.checked = !data[i].checked
      }
      return item;
    })
    setData(result);
  }, [data]);

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  const totalCost = React.useMemo(() => {
    const cost = (data || []).reduce((acc, item) => {
      if (item.checked) {
        acc += item.value;
      }
      return acc;
    }, 0);
    return cost;
  }, [data]);

  return (
    <View>
      {!data ?
        <>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </>
        :
        <ScrollView>
          <Card title="Full Remodel">
            <>
              <Text h3 style={styles.costContainer}>
                {`$${totalCost}`}
              </Text>
                {
                  data.map((item, i) => (
                    <ListItem
                      bottomDivider
                      checkBox={{ 
                        checked: item.checked,
                        onPress: handleCheckBoxOnPress(i)
                      }}
                      key={i}
                      title={item.category}
                      rightTitle={`$${item.value}`}
                    />
                  ))
                }
              <Button
                mode="contained" 
                style={styles.buttonContainer}
              >
                {"Proceed"}
              </Button>
            </>
        </Card>
      </ScrollView>
      }
      
    </View>
  )
};

export default React.memo(FullRemodelSummary);