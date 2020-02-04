import { startCase } from 'lodash';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { Button } from 'react-native-paper';

import styles from './styles';
import { PropertyInfoViewProps } from '../PropertyInfo';

const PropertyInfoView: React.ComponentType<PropertyInfoViewProps> = (props) => {
  const { dataArray, handleButtonContinueOnPress } = props;
  
  return (
    <SafeAreaView>
      <ScrollView>
      <Card title="Property Info">
        {dataArray.map(item => (
          <ListItem
            bottomDivider
            key={item.name}
            title={startCase(item.name)}
            rightTitle={`${item.value}`}
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