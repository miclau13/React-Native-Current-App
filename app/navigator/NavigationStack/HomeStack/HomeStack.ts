import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from './navigationOptionsConfig';
import ArvEstimateScreen, { navigationOptions as ArvEstimateScreenNavigationOptions } from "../../../screens/ArvEstimate";
import AsIsEstimateScreen, { navigationOptions as AsIsEstimateScreenNavigationOptions } from "../../../screens/AsIsEstimate";
import AutocompleteScreen, { navigationOptions as AutocompleteScreenNavigationOptions }  from "../../../screens/Autocomplete";
import CameraScreen, { navigationOptions as CameraScreenNavigationOptions }  from "../../../screens/Camera";
import CameraPhotoAddScreen, { navigationOptions as CameraPhotoAddScreenNavigationOptions }  from "../../../screens/CameraPhotoAdd";
import CameraPhotoUploadScreen, { navigationOptions as CameraPhotoUploadScreenNavigationOptions }  from "../../../screens/CameraPhotoUpload";
import CreateRehabScreen, { navigationOptions as CreateRehabScreenNavigationOptions }  from "../../../screens/CreateRehab";
import ContactPhoneNumberScreen, { navigationOptions as ContactPhoneNumberScreenNavigationOptions } from "../../../screens/ContactPhoneNumber";
import FullRemodelSummaryScreen, { navigationOptions as FullRemodelSummaryScreenNavigationOptions } from "../../../screens/FullRemodelSummary";
import HomeScreen, { navigationOptions as HomeScreenNavigationOptions } from "../../../screens/Home";
import ProfitSummaryScreen, { navigationOptions as ProfitSummaryScreenNavigationOptions } from "../../../screens/ProfitSummary";
import PropertyInfoScreen, { navigationOptions as PropertyInfoScreenNavigationOptions } from "../../../screens/PropertyInfo";
import TotalDebtsScreen, { navigationOptions as TotalDebtsScreenNavigationOptions } from "../../../screens/TotalDebts";
import VacantPropertyScreen, { navigationOptions as VacantPropertyScreenNavigationOptions } from "../../../screens/VacantProperty";

const HomeStack = createStackNavigator(
  {
    ArvEstimateScreen: {
      screen: ArvEstimateScreen,
      navigationOptions: ArvEstimateScreenNavigationOptions,
    },
    AsIsEstimateScreen: {
      screen: AsIsEstimateScreen,
      navigationOptions: AsIsEstimateScreenNavigationOptions,
    },
    AutocompleteScreen: {
      screen: AutocompleteScreen,
      navigationOptions: AutocompleteScreenNavigationOptions,
    },
    CreateRehabScreen: {
      screen: CreateRehabScreen,
      navigationOptions: CreateRehabScreenNavigationOptions,
    },
    CameraScreen: {
      screen: CameraScreen,
      navigationOptions: CameraScreenNavigationOptions,
    },
    CameraPhotoAddScreen: {
      screen: CameraPhotoAddScreen,
      navigationOptions: CameraPhotoAddScreenNavigationOptions,
    },
    CameraPhotoUploadScreen: {
      screen: CameraPhotoUploadScreen,
      navigationOptions: CameraPhotoUploadScreenNavigationOptions,
    },
    ContactPhoneNumberScreen: {
      screen: ContactPhoneNumberScreen,
      navigationOptions: ContactPhoneNumberScreenNavigationOptions,
    },
    FullRemodelSummaryScreen: {
      screen: FullRemodelSummaryScreen,
      navigationOptions: FullRemodelSummaryScreenNavigationOptions,
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: HomeScreenNavigationOptions,
    },
    ProfitSummaryScreen: {
      screen: ProfitSummaryScreen,
      navigationOptions: ProfitSummaryScreenNavigationOptions,
    },
    PropertyInfoScreen: {
      screen: PropertyInfoScreen,
      navigationOptions: PropertyInfoScreenNavigationOptions,
    },
    TotalDebtsScreen: {
      screen: TotalDebtsScreen,
      navigationOptions: TotalDebtsScreenNavigationOptions,
    },
    VacantPropertyScreen: {
      screen: VacantPropertyScreen,
      navigationOptions: VacantPropertyScreenNavigationOptions,
    },
  }, { initialRouteName: "HomeScreen" }
);

HomeStack.navigationOptions = navigationOptions;

export default HomeStack;