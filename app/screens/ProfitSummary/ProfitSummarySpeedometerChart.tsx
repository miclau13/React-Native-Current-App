import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import RNSpeedometer from '../../components/Chart/Speedometer';
import { primaryGreen, primaryRed, primaryYellow } from '../../styles/constants';

type ProfitSummarySpeedmeterChartProps = {
  value: number;
}

const labels = [
  { name: "Bad", labelColor: primaryRed, activeBarColor: primaryRed },
  { name: "Marginal", labelColor: primaryYellow, activeBarColor: primaryYellow },
  { name: "Good", labelColor: primaryGreen, activeBarColor: primaryGreen },
]

const ProfitSummarySpeedmeterChart: React.ComponentType<ProfitSummarySpeedmeterChartProps> = (props) => {
  const { value } = props;

  const calculateLabelFromValue = (value, labels, minValue, maxValue) => {
    // const currentValue = (value) / (maxValue - minValue);
    // console.log("calculateLabelFromValue value" ,value)
    const currentIndex = value < 0 ? 0 : value > 50 ? 2 : 1;
    const label = labels[currentIndex];
    return label;
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNSpeedometer
        allowedDecimals={2}
        calculateLabelFromValue={calculateLabelFromValue}
        labels={labels}
        minValue={-50}
        maxValue={100}
        size={250}
        value={value} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfitSummarySpeedmeterChart;