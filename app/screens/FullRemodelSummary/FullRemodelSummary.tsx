import { gql } from 'apollo-boost';
import { omit } from 'lodash';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import NumberFormat from 'react-number-format';

import { useMutation } from '@apollo/react-hooks';

import styles from './styles';

type Params = {
  arv?: number;
  asIs?: number;
  createRehabInput?: object;
};

type ScreenProps = {};

const CREATE_REHAB = gql`
  mutation CreateRehab($input: CreateRehabInput!) {
    createRehab(input: $input) {
      arv
      rehabId
      rehabItemPackage {
        id
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
  const [arv, setArv] = React.useState();
  const [asIs, setAsIs] = React.useState(createRehabInput.asIs);
  const [data, setData] = React.useState();
  const [rehabId, setRehabId] = React.useState();
  const [rehabItems, setRehabItems] = React.useState();
  const [rehabItemPackageId, setRehabItemPackageId] = React.useState();

  const updatedArv = navigation.getParam("arv", null);
  const updatedAsIs = navigation.getParam("asIs", null);

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
        setArv(result.data.createRehab.arv);
        setData(dataArry);
        setRehabId(result.data.createRehab.rehabId);
        setRehabItems(result.data.createRehab.rehabItemPackage.rehabItems.map(item => {
          return omit(item, ["__typename"]);
        }));
        setRehabItemPackageId(result.data.createRehab.rehabItemPackage.id);
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
    });
    const updatedRehabItems = rehabItems.filter(item => item.category !== data[i].category);
    setData(result);
    setRehabItems(updatedRehabItems);
  }, [data, rehabItems]);

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
    navigation.navigate("ProfitSummaryScreen", { 
      rehabId,
      arv: updatedArv ? updatedArv : arv, 
      asIs: updatedAsIs ? updatedAsIs: asIs,
      rehabItemPackage: {
        rehabItems,
        id: rehabItemPackageId,
      },
      remodellingCost: totalCost, 
      step: "summary" });
  }, [arv, data, rehabId, rehabItems, rehabItemPackageId, setArv, setAsIs, updatedArv, updatedAsIs]);

  React.useEffect(() => {
    console.log("FullRemodelSummary Mount");
    bootstrapAsync();
    return () => {
      console.log("FullRemodelSummary UnMount");
    }
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  };

  return (
    <ScrollView>
      <Card title="Remodeling Costs">
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
  )
};

export default React.memo(FullRemodelSummary);