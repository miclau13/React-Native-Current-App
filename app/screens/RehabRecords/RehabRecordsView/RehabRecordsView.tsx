import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements'
import NumberFormat from 'react-number-format';

import { CalculateRemodelingCost, FindLabelAttributes } from '../../../common/utils/Calculator';

import styles from './styles';

interface RehabRecordsViewProps {
  // TODO type
  handleItemOnPress: any;
  rehabRecords: any;
};

const RehabRecordsView: React.ComponentType<RehabRecordsViewProps> = (props) => {
  const { handleItemOnPress, rehabRecords } = props;  

  React.useEffect(() => {
    console.log("RehabRecordsView Mount")
    return () => {console.log("RehabRecordsView UnMount")}
  }, []);
  
  return (
    <SafeAreaView>
      <ScrollView>
        {rehabRecords.map((rehabRecord, i) => {
          const { arv, asIs, rehabItemsPackage } = rehabRecord;
          const remodellingCost = CalculateRemodelingCost(rehabItemsPackage.rehabItems);
          const profit = arv - asIs - remodellingCost;
          const profitPercent = profit / remodellingCost * 100;
          const labelColor = FindLabelAttributes(profitPercent).labelColor;

          return (
            <ListItem
              bottomDivider
              chevron
              key={i}
              leftAvatar={
                <Icon color={labelColor} name="circle" size={32} type="font-awesome" />
              }
              onPress={handleItemOnPress(i)}
              title={rehabRecord.address}
              subtitle={
                <>
                  <View style={styles.viewBox1} />
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.subtitleStyle}>{`Est. ARV: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={rehabRecord.arv}
                  />
                  <View style={styles.viewBox1} />
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.subtitleStyle}>{`AS-IS: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={rehabRecord.asIs}
                  />
                  <View style={styles.viewBox1} />
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.subtitleStyle}>{`Remodeling Cost: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={remodellingCost}
                  />
                </>
              }
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(RehabRecordsView);