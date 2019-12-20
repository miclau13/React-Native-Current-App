import { isNil } from 'lodash';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Icon, ListItem, Text } from 'react-native-elements'
import { Banner, BannerAction, Button, ButtonProps } from 'react-native-paper';
import NumberFormat from 'react-number-format';

import Speedometer from '../ProfitSummarySpeedometerChart';
import styles from './styles';

interface ProfitSummaryViewProps {
  // TODO type
  bannerMessages: string;
  data: any;
  handleBannerButtonOnClick: BannerAction['onPress'];
  handleSaveOnPress: any;
  handleSubmitOnPress: any;
  handleStepNavigation: any;
  hasBanner: boolean;
  isQualified: boolean;
  profit: number;
  profitPercent: number;
  status: string;
  submitted: boolean;
};

const ProfitSummaryView: React.ComponentType<ProfitSummaryViewProps> = (props) => {
  const { bannerMessages, data, handleBannerButtonOnClick, handleSaveOnPress, handleSubmitOnPress, 
    handleStepNavigation, hasBanner, isQualified, profit, profitPercent, status, submitted } = props; 
    // console.log("ProfitSummaryView hasBanner",hasBanner)
  const handleEditOnPress: ButtonProps['onPress'] = () => {
    handleStepNavigation("edit");
  };

  React.useEffect(() => {
    return () => {console.log("ProfitSummaryView UnMount")}
  }, []);

  return (
    <ScrollView>
      <Banner 
        actions={[
          {
            label: 'Close',
            onPress: handleBannerButtonOnClick,
          },
        ]}
        //TODO change the access
        image={({size}) => <Icon
          color={data[4].color}
          name={data[4].icon}
          size={size}
          type='font-awesome'
        />}
        style={{ backgroundColor: '#e9d8f2'}}
        visible={hasBanner}
      >
        <Text>{bannerMessages}</Text>
      </Banner>  
      <Card title="Profit Summary">
        <>
        <Speedometer value={profitPercent} />
            <NumberFormat 
              decimalScale={0}
              displayType={'text'} 
              prefix={'$'}
              renderText={value => <Text h3 style={{ marginBottom: 8, marginTop: 64, textAlign: 'center' }}>{`Est. Profit: ${value}`}</Text>}
              thousandSeparator={true} 
              value={profit}
            />
            {
              data.map((item, i) => (
                <ListItem
                  bottomDivider
                  key={i}
                  title={item.name}
                  rightTitle={isNil(item.value) ? null : <NumberFormat 
                    decimalScale={0}
                    displayType={'text'} 
                    prefix={'$'}
                    renderText={value => <Text>{value}</Text>}
                    thousandSeparator={true} 
                    value={item.value}
                  />}
                  rightIcon={isNil(item.icon) ? null :
                    <Icon
                      color={item.color}
                      name={item.icon}
                      size={16}
                      type='font-awesome'
                    />
                  }
                />
              ))
            }
          <View style={styles.container}>
            <Button
              mode="contained"
              onPress={handleEditOnPress}
              style={styles.buttonContainer}
            >
              {"Edit"}
            </Button>
            <Button
              mode="contained" 
              onPress={handleSaveOnPress}
              style={styles.buttonContainer}
            >
              {"Save"}
            </Button>
            <Button
              disabled={submitted || !isQualified}
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
  );
}
export default React.memo(ProfitSummaryView);