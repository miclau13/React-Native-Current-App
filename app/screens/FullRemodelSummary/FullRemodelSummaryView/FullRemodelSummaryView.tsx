import React from 'react';
import { SafeAreaView, ScrollView  } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { FullRemodelSummaryProps } from '../FullRemodelSummary';

interface FullRemodelSummaryViewProps extends FullRemodelSummaryProps {};

const FullRemodelSummaryView: React.ComponentType<FullRemodelSummaryViewProps> = (props) => {
  const { data, handleCheckBoxOnPress, handleOnPress, totalCost } = props;  

  React.useEffect(() => {
    console.log("FullRemodelSummaryView Mount")
    return () => {console.log("FullRemodelSummaryView UnMount")}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
          <Card title="Remodeling Costs">
            <>
              <NumberFormat 
                displayType={'text'} 
                prefix={'$'}
                renderText={value => <Text h3 style={styles.totalCostText}>{value}</Text>}
                thousandSeparator={true} 
                value={totalCost}
              />
              {data.map((item, i) => (
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