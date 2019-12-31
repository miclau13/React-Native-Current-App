import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements'
import NumberFormat from 'react-number-format';

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
        { 
          rehabRecords.map((rehabRecord, i) => (
            <ListItem
              bottomDivider
              chevron
              key={i}
              onPress={handleItemOnPress(i)}
              title={rehabRecord.address}
              subtitle={
                <>
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text>{`Est. ARV: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={rehabRecord.arv}
                  />
                  <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text>{`AS-IS: ${value}`}</Text>}
                    thousandSeparator={true} 
                    value={rehabRecord.asIs}
                  />
                </>
              }
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
export default React.memo(RehabRecordsView);