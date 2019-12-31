import { isNumber } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Icon, ListItem, ListItemProps, Text } from 'react-native-elements'
import NumberFormat from 'react-number-format';

interface RehabRecordsViewProps {
  // TODO type
  expandPropertyDetails: boolean;
  handlePropertyDetailsOnPress: ListItemProps['onPress'];
  items: any;
};

const RehabRecordsView: React.ComponentType<RehabRecordsViewProps> = (props) => {
  const { expandPropertyDetails, handlePropertyDetailsOnPress, items } = props;  

  React.useEffect(() => {
    console.log("RehabRecordsView Mount")
    return () => {console.log("RehabRecordsView UnMount")}
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {items.map((item, i) => {
          if (item.category && !expandPropertyDetails) {
            return null;
          };
          const isPropertyDetails = item.name === "Property Details: ";
          return (
            <ListItem
              chevron={isPropertyDetails ? expandPropertyDetails ? <Icon name="keyboard-arrow-up" /> : <Icon name="keyboard-arrow-down" /> : null}
              key={i}
              onPress={isPropertyDetails ? handlePropertyDetailsOnPress : null}
              rightTitle={isNumber(item.value) ? 
                <NumberFormat 
                  decimalScale={0}
                  displayType={'text'} 
                  prefix={item.unit ? null : '$'}
                  renderText={value => <Text>{value}</Text>}
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