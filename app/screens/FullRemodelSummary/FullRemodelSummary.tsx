import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import NumberFormat from 'react-number-format';

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
  const [arv, setArv] = React.useState();

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
        setArv(result.data.createRehab.arv);
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

  const totalCost = React.useMemo(() => {
    const cost = (data || []).reduce((acc, item) => {
      if (item.checked) {
        acc += item.value;
      }
      return acc;
    }, 0);
    return cost;
  }, [data]);

  const handleOnPress = React.useCallback(() => {
    navigation.navigate("ProfitSummaryScreen", { arv, asIs: createRehabInput.asIs, remodellingCost: totalCost });
  }, [arv, data]);

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

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
                <NumberFormat 
                  displayType={'text'} 
                  prefix={'$'}
                  renderText={value => <Text h3 style={{marginBottom: 8, textAlign: 'center',}}>{value}</Text>}
                  thousandSeparator={true} 
                  value={totalCost}
                />
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
                      rightTitle={<NumberFormat 
                        displayType={'text'} 
                        prefix={'$'}
                        renderText={value => <Text>{value}</Text>}
                        thousandSeparator={true} 
                        value={item.value}
                      />}
                    />
                  ))
                }
              <Button
                mode="contained" 
                onPress={handleOnPress}
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