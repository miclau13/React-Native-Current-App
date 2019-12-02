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

const fakeResult = [
  {
    "name": "refaceKitchenCabinetUpper",
    "cost": 0,
    "category": "Kitchen"
  },
  {
    "name": "refaceKitchenCabinetBase",
    "cost": 0,
    "category": "Kitchen"
  },
  {
    "name": "refaceKitchenIsland",
    "cost": 534,
    "category": "Kitchen"
  },
  {
    "name": "replaceCountertop",
    "cost": 0,
    "category": "Kitchen"
  },
  {
    "name": "backsplashTiling",
    "cost": 160,
    "category": "Kitchen"
  },
  {
    "name": "replaceAndHookupRange",
    "cost": 1334,
    "category": "Kitchen"
  },
  {
    "name": "replaceHoodWithMicrowave",
    "cost": 1134,
    "category": "Kitchen"
  },
  {
    "name": "replaceDiswasher",
    "cost": 934,
    "category": "Kitchen"
  },
  {
    "name": "replaceRefrigerator",
    "cost": 2000,
    "category": "Kitchen"
  },
  {
    "name": "recarpetAllBedrooms",
    "cost": 3040,
    "category": "Flooring"
  },
  {
    "name": "installNewLaminateWoodFlooring",
    "cost": 18640,
    "category": "Flooring"
  },
  {
    "name": "repaintAllWallsAndTrims",
    "cost": 10550,
    "category": "Painting - Walls"
  },
  {
    "name": "repaintAllDoors",
    "cost": 600,
    "category": "Painting - Walls"
  },
  {
    "name": "newDoorHandles",
    "cost": 240,
    "category": "Painting - Walls"
  },
  {
    "name": "repaintAllClosetDoors",
    "cost": 427,
    "category": "Painting - Walls"
  },
  {
    "name": "newClosetDoorKnobs",
    "cost": 107,
    "category": "Painting - Walls"
  },
  {
    "name": "cleanUpAndDumpFees",
    "cost": 2000,
    "category": "Clean up"
  },
  {
    "name": "staging",
    "cost": 2667,
    "category": "Staging"
  },
  {
    "name": "resurfaceBathtub",
    "cost": 1067,
    "category": "1"
  },
  {
    "name": "tubEnclosureTiling",
    "cost": 2434,
    "category": "1"
  },
  {
    "name": "replaceToilet",
    "cost": 1067,
    "category": "1"
  },
  {
    "name": "replaceVanityWithSinkAndMirror",
    "cost": 2000,
    "category": "1"
  },
  {
    "name": "newFlooring",
    "cost": 1534,
    "category": "1"
  },
  {
    "name": "hardware",
    "cost": 667,
    "category": "1"
  },
  {
    "name": "plumping",
    "cost": 667,
    "category": "1"
  },
  {
    "name": "repairWallsAndPaint",
    "cost": 934,
    "category": "1"
  },
  {
    "name": "replaceShowerBase",
    "cost": 1000,
    "category": "1"
  },
  {
    "name": "newGlassShowerDoorAndPanel",
    "cost": 2000,
    "category": "1"
  },
  {
    "name": "showerEnclosureTiling",
    "cost": 1600,
    "category": "1"
  },
  {
    "name": "replaceToilet",
    "cost": 1067,
    "category": "1"
  },
  {
    "name": "replaceVanityWithSinkAndMirror",
    "cost": 1734,
    "category": "1"
  },
  {
    "name": "newFlooring",
    "cost": 1700,
    "category": "1"
  },
  {
    "name": "hardware",
    "cost": 667,
    "category": "1"
  },
  {
    "name": "plumping",
    "cost": 667,
    "category": "1"
  },
  {
    "name": "repairWallsAndPaint",
    "cost": 934,
    "category": "1"
  },
  {
    "name": "replaceToilet",
    "cost": 1067,
    "category": "1"
  },
  {
    "name": "replaceVanityWithSinkAndMirror",
    "cost": 1734,
    "category": "1"
  },
  {
    "name": "newFlooring",
    "cost": 2000,
    "category": "1"
  },
  {
    "name": "hardware",
    "cost": 267,
    "category": "1"
  },
  {
    "name": "repairWallsAndPaint",
    "cost": 667,
    "category": "1"
  }
]

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
  const [data, setData] = React.useState([]);

  const bootstrapAsync = async () => {
    const fakeInput = {
      address: "246 12th St SE, Auburn, WA, 98002",
      asIs: 150000,
      propertyDetails: {
        kitchenCabinetUpperLength: 0,
        kitchenCabinetBaseLength: 0,
        kitchenCabinetIslandLength: 0,
        bedsInfo: [{ size:192, order: 1 }, { size: 144, order: 2 }, { size: 120, order: 3 }],
        fullBathsInfo: [{ size:60, order: 1}],
        threeQuarterBathsInfo: [{ size:60, order: 1}],
        halfBathsInfo: [{ size:60, order: 1}]
      }
    };
      const itemsMap = fakeResult.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = item.cost;
          } else {
            acc[item.category] += item.cost;
          }
          return acc;
        }, {});
        console.log("itemsMap", itemsMap)
        let dataArry = [];
        for (let [key, value] of Object.entries(itemsMap)) {
          dataArry.push({ value, category: key, checked: true });
        }
    setData(dataArry);
    // try {
    //   const result = await createRehab({ variables: { input: fakeInput } });
    //   if (result) {
    //     // const totalCost = result.data.createRehab.rehabItems.reduce((accumulator, item) => {
    //     //   return accumulator + item.cost;
    //     // }, 0)
    //     // setData(totalCost)
    //     console.log(result.data.createRehab.rehabItemPackage.rehabItems);
    //     const itemsMap = result.data.createRehab.rehabItemPackage.rehabItems.reduce((acc, item) => {
    //       if (!acc[item.category]) {
    //         acc[item.category] = item.cost;
    //       } else {
    //         acc[item.category] += item.cost;
    //       }
    //       return acc;
    //     }, {});
    //     console.log("itemsMap", itemsMap)
    //     let dataArry = [];
    //     for (let [key, value] of Object.entries(itemsMap)) {
    //       dataArry.push({ category: key, value, style: { paddingLeft: 8 } });
    //     }
    //     console.log("dataArry", dataArry)
    //     setData(dataArry);
    //     // console.log("result", result)
    //   }
    // } catch (e) {
    //   console.log("createRehab e", e)
    // }
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
    const cost = data.reduce((acc, item) => {
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