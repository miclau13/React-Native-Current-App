import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { RehabRecordsViewProps } from '../RehabRecords';
import { calculateRemodelingCost, findLabelAttributes } from '../../../common/utils/Calculator';
import { primaryRed } from '../../../styles/constants';

const RehabRecordsView: React.ComponentType<RehabRecordsViewProps> = (props) => {
  const { deleteMode, handleItemOnPress, handleItemDeleteOnPress, rehabRecords } = props;  
  
  return (
    <SafeAreaView>
      <ScrollView>
        {rehabRecords.map((rehabRecord, i) => {
          const { arv, asIs, checked, rehabItemsPackage } = rehabRecord;
          const isRevised = !!rehabItemsPackage.revisedRehabItems;
          const remodelingCost = isRevised ? calculateRemodelingCost(rehabItemsPackage?.revisedRehabItems) : calculateRemodelingCost(rehabItemsPackage?.rehabItems);
          const profit = arv - asIs - remodelingCost;
          const profitPercent = profit / remodelingCost * 100;
          const labelColor = findLabelAttributes(profitPercent).labelColor;

          let lowerLimit = Math.ceil(remodelingCost * 0.7);
          let upperLimit = Math.ceil(remodelingCost * 1.3);
          return (
            <ListItem
              bottomDivider
              chevron={!deleteMode || 
                <Icon 
                  color={primaryRed}
                  name={checked ? "check-circle" : "checkbox-blank-circle-outline"}
                  onPress={handleItemDeleteOnPress(i)}
                  type="material-community"
                />
              }
              key={i}
              leftAvatar={
                <Icon color={labelColor} name="circle" size={32} type="font-awesome" />
              }
              onPress={deleteMode ? null : handleItemOnPress(i)}
              rightIcon={rehabItemsPackage?.submitted ? 
                <Chip>
                  Submitted
                </Chip>
                : null
              }
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
                  <View style={styles.totalCostText}>
                    {isRevised ? 
                      <NumberFormat 
                        decimalScale={0}
                        displayType={'text'} 
                        prefix={'$'}
                        renderText={value => <Text style={styles.greyColor}>{`Fiximize Quotation: ${value}`}</Text>}
                        thousandSeparator={true} 
                        value={remodelingCost}
                      /> :
                      <>
                        <Text style={styles.greyColor}>{`Remodeling Budget: `}</Text> 
                        <NumberFormat 
                          decimalScale={0}
                          displayType={'text'} 
                          prefix={'$'}
                          renderText={value => <Text style={styles.greyColor}>{value}</Text>}
                          thousandSeparator={true} 
                          value={lowerLimit}
                        />
                        <Text style={styles.greyColor}> to </Text> 
                        <NumberFormat 
                          decimalScale={0}
                          displayType={'text'} 
                          prefix={'$'}
                          renderText={value => <Text style={styles.greyColor}>{value}</Text>}
                          thousandSeparator={true} 
                          value={upperLimit}
                        />
                      </>
                    }
                  </View>
                  {/* <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text style={styles.subtitleStyle}>{`Remodeling Budget${isRevised ? '(Revised)' : ''}: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={remodelingCost}
                  /> */}
                </>
              }
              title={rehabRecord.address}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(RehabRecordsView);