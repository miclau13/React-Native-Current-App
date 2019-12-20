import { gql } from 'apollo-boost';
import { omit, sortBy } from 'lodash';
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
  submitted?: boolean;
  totalDebts?: number;
  vacant?: boolean;
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
          selected
        }
        submitted
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
  const [submitted, setSubmitted] = React.useState(navigation.getParam("submitted", false));

  const updatedArv = navigation.getParam("arv", null);
  const updatedAsIs = navigation.getParam("asIs", null);
  const updatedSubmitted = navigation.getParam("submitted", false);
  const updatedVacant = navigation.getParam("vacant", null);
  const totalDebts = navigation.getParam("totalDebts", null);
  const vacant = navigation.getParam("vacant", null);

  const bootstrapAsync = async () => {
    try {
      const result = await createRehab({ variables: { input: createRehabInput } });
      if (result) {
        const itemsMap = result.data.createRehab.rehabItemPackage.rehabItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = {
              cost: item.cost,
              selected: item.selected,
            }
          } else {
            acc[item.category]["cost"] += item.cost;
          }
          return acc;
        }, {});
        let dataArry = [];
        const orderMapForData = {
          "Kitchen": 0,
          "Full Bath": 1,
          "Flooring": 2,
          "Interior Paint": 3,
          "Paint - Walls": 3,
          "Clean up": 4,
          "Staging": 5,
        };
        for (let [key, value] of Object.entries(itemsMap)) {
          dataArry.push({ category: key, value: value.cost, selected: value.selected, order: orderMapForData[key] });
        };
        setArv(result.data.createRehab.arv);
        setData(sortBy(dataArry, ["order"]));
        setRehabId(result.data.createRehab.rehabId);
        setRehabItems(result.data.createRehab.rehabItemPackage.rehabItems.map(item => {
          return omit(item, ["__typename"]);
        }));
        setRehabItemPackageId(result.data.createRehab.rehabItemPackage.id);
        setSubmitted(result.data.createRehab.rehabItemPackage.submitted);
      }
    } catch (e) {
      console.log("createRehab e", e)
    }
  };

  const handleCheckBoxOnPress = (i) => () => {
    const result = data.map((item, index) => {
      if (index === i) {
        item.selected = !data[i].selected
      }
      return item;
    });
    const updatedRehabItems = rehabItems.map((item) => {
      if (item.category === data[i].category) {
        item.selected = !item.selected;
      }
      return item;
    });
    setData(result);
    setRehabItems(updatedRehabItems);
  };

  const totalCost = React.useMemo(() => {
    const cost = (data || []).reduce((acc, item) => {
      if (item.selected) {
        acc += item.value;
      }
      return acc;
    }, 0);
    return cost;
  }, [data]);

  const handleOnPress = React.useCallback(() => {
    navigation.navigate("ProfitSummaryScreen", { 
      rehabId,
      totalDebts,
      arv: updatedArv ? updatedArv : arv, 
      asIs: updatedAsIs ? updatedAsIs: asIs,
      rehabItemPackage: {
        rehabItems,
        id: rehabItemPackageId,
      },
      remodellingCost: totalCost, 
      step: "summary",
      submitted: updatedSubmitted ? updatedSubmitted : submitted,
      vacant: updatedVacant ? updatedVacant: vacant,
    });
  }, [arv, data, rehabId, rehabItems, rehabItemPackageId, setArv, setAsIs, 
    updatedArv, updatedAsIs, updatedSubmitted, updatedVacant, vacant]);

  React.useEffect(() => {
    console.log("FullRemodelSummary Mount");
    bootstrapAsync();
    return () => {
      console.log("FullRemodelSummary UnMount");
    }
  }, [submitted]);

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
                  checked: item.selected,
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