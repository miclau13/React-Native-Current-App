import { isFinite, isNil, isNumber } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Card, Icon, ListItem, Text } from 'react-native-elements'
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { ProfitSummaryViewProps } from '../ProfitSummary';
import Speedometer from '../ProfitSummarySpeedometerChart';

const ProfitSummaryView: React.ComponentType<ProfitSummaryViewProps> = (props) => {
  const { 
    fields,
    handleEditOnPress,
    handleSaveOnPress, 
    handleSubmitOnPress, 
    roi,
    status, 
    submitted,
  } = props; 

  return (
    <SafeAreaView>
      <ScrollView>
        <Card title="Profit Summary">
        <>
          <Speedometer value={roi} />
          {fields.map((item, i) => (
            <ListItem
              bottomDivider
              key={i}
              title={item.name}
              rightTitle={ !isFinite(item.value) && isNumber(item.value) ? 
                <Text> Infinity </Text> : (item.lowerLimit && item.upperLimit && (item.upperLimit !== item.lowerLimit)) ? 
                <Text>
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={item.unit != '%' ? '$' : null}
                    suffix={item.unit == '%' ? '%' : null}
                    renderText={value => <Text>{`${value}`}</Text>}
                    thousandSeparator={true} 
                    value={item.lowerLimit}
                  />
                  <Text> to </Text>
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={item.unit != '%' ? '$' : null}
                    suffix={item.unit == '%' ? '%' : null}
                    renderText={value => <Text>{`${value}`}</Text>}
                    thousandSeparator={true} 
                    value={item.upperLimit}
                  />
                </Text> : (!isNil(item.value) && isNumber(item.value)) ?
                <NumberFormat 
                  decimalScale={0}
                  displayType={'text'} 
                  prefix={item.unit != '%' ? '$' : null}
                  suffix={item.unit == '%' ? '%' : null}
                  renderText={value => <Text>{value}</Text>}
                  thousandSeparator={true} 
                  value={item.value}
                /> : null 
              }
              rightIcon={isNil(item.icon) ? null :
                <Icon
                  color={item.color}
                  name={item.icon}
                  size={16}
                  type='font-awesome'
                />
              }
            />
          ))}
          <View style={styles.container}>
            <Button
              disabled={submitted}
              mode="contained"
              onPress={handleEditOnPress}
              style={styles.buttonContainer}
            >
              {"Edit"}
            </Button>
            <Button
              disabled={submitted}
              mode="contained" 
              onPress={handleSaveOnPress}
              style={styles.buttonContainer}
            >
              {"Save"}
            </Button>
            <Button
              disabled={submitted}
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
  </SafeAreaView>
  );
}
export default React.memo(ProfitSummaryView);