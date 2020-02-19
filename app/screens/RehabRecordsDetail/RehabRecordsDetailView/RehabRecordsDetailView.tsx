import { isNumber } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { RehabRecordsDetailProps } from '../RehabRecordsDetail';
interface RehabRecordsViewProps extends RehabRecordsDetailProps {
};

const RehabRecordsView: React.ComponentType<RehabRecordsViewProps> = (props) => {
  const { expandPropertyDetails, handlePropertyDetailsOnPress, items } = props;  

  return (
    <SafeAreaView>
      <ScrollView>
        {items.map((item, i) => {
          if (item.category && !expandPropertyDetails) {
            return null;
          };
          const isPropertyDetails = item.name === "Property Details: ";
          const isRange = item.name === "Profit: " || item.name === "Remodeling Budget: ";
          return (
            <ListItem
              chevron={isPropertyDetails ? expandPropertyDetails ? <Icon name="keyboard-arrow-up" /> : <Icon name="keyboard-arrow-down" /> : null}
              key={i}
              onPress={isPropertyDetails ? handlePropertyDetailsOnPress : null}
              rightTitle={ isRange ?
                  <View style={styles.totalCostText}>
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.greyColor}>{value}</Text>}
                    thousandSeparator={true} 
                    value={item.lowerLimit}
                  />
                  <Text style={styles.greyColor}> to </Text> 
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.greyColor}>{value}</Text>}
                    thousandSeparator={true} 
                    value={item.upperLimit}
                  />
                  </View> : isNumber(item.value) ? 
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={item.unit ? null : '$'}
                    renderText={value => <Text style={styles.subtitleStyle} >{value}</Text>}
                    suffix={item.unit}
                    thousandSeparator={true}
                    value={item.value}
                  /> : item.value
              }
              title={item.name}
              titleStyle={item.style}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(RehabRecordsView);