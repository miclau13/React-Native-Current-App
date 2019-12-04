import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { NavigationStackScreenComponent } from "react-navigation-stack";
import NumberFormat from 'react-number-format';

// import { useMutation } from '@apollo/react-hooks';
import Speedometer from './ProfitSummarySpeedometerChart';
import styles from './styles';

type Params = {
  arv: number;
  asIs: number;
  remodellingCost: number;
};

type ScreenProps = {};

// const CREATE_REHAB = gql`
//   mutation CreateRehab($input: CreateRehabInput!) {
//     createRehab(input: $input) {
//       arv
//       rehabItemPackage {
//         rehabItems {
//           category
//           cost
//           name
//         }
//       }
//     }
//   }
// `;

const ProfitSummary: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  // const [createRehab] = useMutation(CREATE_REHAB);
  // const createRehabInput = navigation.getParam("createRehabInput", null);
  const arv = navigation.getParam("arv", 0);
  const asIs = navigation.getParam("asIs", 0);
  const remodellingCost = navigation.getParam("remodellingCost", 0);
  const profit = React.useMemo(() => {
    return +(arv - asIs - remodellingCost);
  }, [arv, asIs, remodellingCost]);
  const [data, setData] = React.useState([
    { name: "Est. ARV", value: arv },
    { name: "As-Is", value: asIs },
    { name: "Remodelling Cost", value: remodellingCost },
  ]);

  const profitPercent = React.useMemo(() => {
    return profit / asIs * 100;
  },[profit, asIs]);

  console.log("arv", arv, "asIs", asIs,"remodellingCost", remodellingCost, "profitPercent", profitPercent)

  const bootstrapAsync = async () => {
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View>
      {false ?
        <>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </>
        :
        <ScrollView>
          <Card title="Profit Summary">
            <>
            <Speedometer value={profitPercent} />
                <NumberFormat 
                  decimalScale={0}
                  displayType={'text'} 
                  prefix={'$'}
                  renderText={value => <Text h3 style={{ marginBottom: 8, marginTop: 64, textAlign: 'center' }}>{`Est. Profit: ${value}`}</Text>}
                  thousandSeparator={true} 
                  value={profit}
                />
                {
                  data.map((item, i) => (
                    <ListItem
                      bottomDivider
                      key={i}
                      title={item.name}
                      rightTitle={<NumberFormat 
                        decimalScale={0}
                        displayType={'text'} 
                        prefix={'$'}
                        renderText={value => <Text>{value}</Text>}
                        thousandSeparator={true} 
                        value={item.value}
                      />}
                    />
                  ))
                }
              <View style={styles.container}>
                <Button
                  mode="contained" 
                  style={styles.buttonContainer}
                >
                  {"Edit"}
                </Button>
                <Button
                  mode="contained" 
                  style={styles.buttonContainer}
                >
                  {"Save"}
                </Button>
                <Button
                  mode="contained" 
                  style={styles.buttonContainer}
                >
                  {"Submit"}
                </Button>
              </View>
            </>
        </Card>
      </ScrollView>
      }
      
    </View>
  )
};

export default React.memo(ProfitSummary);