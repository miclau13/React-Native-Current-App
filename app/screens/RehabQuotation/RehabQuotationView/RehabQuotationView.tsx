import { isNumber } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { RehabQuotationViewProps } from '../RehabQuotation';

const RehabQuotationView: React.ComponentType<RehabQuotationViewProps> = (props) => {
  const { expandDetails, handleExpandOnPress, items } = props;  

  return (
    <SafeAreaView>
      <ScrollView>
        {items.map((item, i) => {
          const { name, value, category, prefix, subItemSize, subTotal, style } = item;
          const isExpanded = subItemSize ? expandDetails[name] : expandDetails[category];

          if (category && !subItemSize && !isExpanded) return null;
          return (
            <ListItem
              badge={subItemSize ? { value: subItemSize } : null}
              chevron={subItemSize ? isExpanded ? <Icon name="keyboard-arrow-up" /> : <Icon name="keyboard-arrow-down" /> : null}
              key={i}
              onPress={subItemSize ? handleExpandOnPress(name) : null}
              rightTitle={
                isNumber(value) ? 
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={prefix}
                    renderText={_value => <Text style={styles.subtitleStyle}>{_value}</Text>}
                    thousandSeparator={true}
                    value={value}
                  /> : value
              }
              subtitle={
                isNumber(subTotal) ? 
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={_value => <Text style={styles.subtitleStyle}>{`Total: ${_value}`}</Text>}
                    thousandSeparator={true}
                    value={subTotal}
                  /> : null
              }
              title={name}
              titleStyle={style}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(RehabQuotationView);