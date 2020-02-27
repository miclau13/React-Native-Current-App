import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { FullRemodelSummaryProps } from '../FullRemodelSummary';

interface FullRemodelSummaryViewProps extends FullRemodelSummaryProps {};

const FullRemodelSummaryView: React.ComponentType<FullRemodelSummaryViewProps> = (props) => {
  const { data, handleCheckBoxOnPress, handleOnPress, totalCost } = props;  
  let lowerLimit = Math.ceil(totalCost * 0.7);
  let upperLimit = Math.ceil(totalCost * 1.3);

  return (
    <SafeAreaView>
      <ScrollView>
          <Card title="Remodeling Budget">
            <>
              <Text h3 style={styles.totalCostText}>
                <NumberFormat 
                  displayType={'text'} 
                  prefix={'$'}
                  renderText={value => <Text>{value}</Text>}
                  thousandSeparator={true} 
                  value={lowerLimit}
                />
                <Text> to </Text> 
                <NumberFormat 
                  displayType={'text'} 
                  prefix={'$'}
                  renderText={value => <Text>{value}</Text>}
                  thousandSeparator={true} 
                  value={upperLimit}
                />
              </Text>
              {data.map((item, i) => (
                <ListItem
                  bottomDivider
                  checkBox={{ 
                    checked: item.selected,
                    onPress: handleCheckBoxOnPress(i)
                  }}
                  key={i}
                  title={item.category}
                  // rightTitle={<NumberFormat 
                  //   displayType={'text'} 
                  //   prefix={'$'}
                  //   renderText={value => <Text>{value}</Text>}
                  //   thousandSeparator={true} 
                  //   value={item.value}
                  // />}
                />
              ))}
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
    </SafeAreaView>
  );
}
export default React.memo(FullRemodelSummaryView);