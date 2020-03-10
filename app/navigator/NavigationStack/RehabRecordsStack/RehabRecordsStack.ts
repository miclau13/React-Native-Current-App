import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from './navigationOptionsConfig';
import RehabRecordsScreen, { navigationOptions as RehabRecordsScreenNavigationOptions } from "../../../screens/RehabRecords";
import RehabRecordsDetailScreen, { navigationOptions as RehabRecordsDetailScreenNavigationOptions } from "../../../screens/RehabRecordsDetail";
import RehabQuotationScreen, { navigationOptions as RehabQuotationScreenNavigationOptions } from "../../../screens/RehabQuotation";

const RehabRecordsStack = createStackNavigator({ 
  RehabRecordsScreen: {
    screen: RehabRecordsScreen,
    navigationOptions: RehabRecordsScreenNavigationOptions,
  },
  // RehabRecordsDetailScreen: {
  //   screen: RehabRecordsDetailScreen,
  //   navigationOptions: RehabRecordsDetailScreenNavigationOptions,
  // },
  RehabQuotationScreen: {
    screen: RehabQuotationScreen,
    navigationOptions: RehabQuotationScreenNavigationOptions,
  },
}, { initialRouteName: "RehabRecordsScreen" });

RehabRecordsStack.navigationOptions = navigationOptions;

export default RehabRecordsStack;