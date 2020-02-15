import { startCase } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { Button } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import styles from './styles';
import { PropertyInfoViewProps } from '../PropertyInfo';

const PropertyInfoView: React.ComponentType<PropertyInfoViewProps> = (props) => {
  const { fields, handleButtonContinueOnPress } = props;
  
  return (
    <SafeAreaView>
      <ScrollView>
      <Card title="Property Info">
        {fields.map(item => (
          <ListItem
            bottomDivider
            key={item.name}
            title={startCase(item.name)}
            rightTitle={
              item.name == "style" ? 
                `${item.value}` :
                <NumberFormat 
                  displayType={'text'} 
                  renderText={value => <Text style={styles.subtitleStyle}>{value}</Text>}
                  thousandSeparator={true} 
                  value={item.value}
                />
            }
          />
        ))} 
      </Card>
      <Button
        mode="contained" 
        onPress={handleButtonContinueOnPress}
        style={styles.buttonContainer}
      >
        {"Continue"}
      </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(PropertyInfoView);