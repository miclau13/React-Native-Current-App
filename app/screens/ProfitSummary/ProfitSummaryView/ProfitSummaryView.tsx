import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button, ButtonProps } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import Speedometer from '../ProfitSummarySpeedometerChart';
import styles from './styles';

interface ProfitSummaryViewProps {
  data: any;
  // TODO type
  handleSaveOnPress: any;
  handleSubmitOnPress: any;
  handleStepNavigation: any;
  profit: number;
  profitPercent: number;
  status: string;
};

const ProfitSummaryView: React.ComponentType<ProfitSummaryViewProps> = (props) => {
  const { data, handleSaveOnPress, handleSubmitOnPress, handleStepNavigation, profit, profitPercent, status } = props; 

  const handleEditOnPress: ButtonProps['onPress'] = () => {
    handleStepNavigation("edit")
  };

  React.useEffect(() => {
    return () => {console.log("ProfitSummaryView UnMount")}
  }, []);

  return (
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
              onPress={handleEditOnPress}
              style={styles.buttonContainer}
            >
              {"Edit"}
            </Button>
            <Button
              mode="contained" 
              onPress={handleSaveOnPress}
              style={styles.buttonContainer}
            >
              {"Save"}
            </Button>
            <Button
              mode="contained" 
              onPress={handleSubmitOnPress}
              style={styles.buttonContainer}
            >
              {"Submit"}
            </Button>
          </View>
        </>
    </Card>
    <Text style={{ textAlign: 'center' }}>{status}</Text>
  </ScrollView>
  );
}
export default React.memo(ProfitSummaryView);