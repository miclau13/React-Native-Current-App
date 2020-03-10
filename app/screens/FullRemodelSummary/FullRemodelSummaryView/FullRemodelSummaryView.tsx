import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { FullRemodelSummaryViewProps } from '../FullRemodelSummary';

const FullRemodelSummaryView: React.ComponentType<FullRemodelSummaryViewProps> = (props) => {
  const { fields, handleCheckBoxOnPress, handleButtonOnPress, remodellingCost } = props;  
  let lowerLimit = Math.ceil(remodellingCost * 0.7);
  let upperLimit = Math.ceil(remodellingCost * 1.3);

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
            {fields.map((field, i) => (
              <ListItem
                bottomDivider
                checkBox={{ 
                  checked: field.selected,
                  onPress: handleCheckBoxOnPress(field.name)
                }}
                key={i}
                title={field.name}
              />
            ))}
            <Button
              mode="contained" 
              onPress={handleButtonOnPress}
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