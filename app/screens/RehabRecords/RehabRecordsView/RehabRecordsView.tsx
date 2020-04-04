import React from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { RehabRecordsViewProps } from '../RehabRecords';
import { calculateRemodelingCost, findLabelAttributes } from '../../../common/utils/Calculator';
import { primaryRed } from '../../../styles/constants';

const RehabRecordsView: React.ComponentType<RehabRecordsViewProps> = (props) => {
  const { deleteMode, handleItemOnPress, handleItemDeleteOnPress, index, rehabRecord } = props; 
  const { address, arv, asIs, checked, rehabItemsPackage } = rehabRecord;
  const isRevised = !!rehabItemsPackage.revisedRehabItems;
  const taxRate = rehabItemsPackage?.taxRate;
  const subTotal = isRevised ? calculateRemodelingCost(rehabItemsPackage?.revisedRehabItems) : calculateRemodelingCost(rehabItemsPackage?.rehabItems);
  const salesTax = subTotal * taxRate;
  const totalCost = subTotal + salesTax;
  const profit = arv - asIs - totalCost;
  const profitPercent = profit / totalCost * 100;
  const labelColor = findLabelAttributes(profitPercent).labelColor;
  let lowerLimit = Math.ceil(totalCost * 0.7);
  let upperLimit = Math.ceil(totalCost * 1.3); 
  
  return (
    <ListItem
      bottomDivider
      chevron={!deleteMode || 
        <Icon 
          color={primaryRed}
          name={checked ? "check-circle" : "checkbox-blank-circle-outline"}
          onPress={handleItemDeleteOnPress(index)}
          type="material-community"
        />
      }
      key={index}
      leftAvatar={
        <Icon color={labelColor} name="circle" size={32} type="font-awesome" />
      }
      onPress={deleteMode ? null : handleItemOnPress(index)}
      rightIcon={rehabItemsPackage?.submitted ? 
        <Chip>
          {isRevised ? "Quoted" : "Submitted"}
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
            value={arv}
          />
          <View style={styles.viewBox1} />
          <NumberFormat 
            decimalScale={0}
            displayType={'text'} 
            prefix={'$'}
            renderText={value => <Text style={styles.subtitleStyle}>{`AS-IS: ${value}`}</Text>}
            thousandSeparator={true} 
            value={asIs}
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
                value={totalCost}
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
        </>
      }
      title={address}
    />
  );
}
export default React.memo(RehabRecordsView);