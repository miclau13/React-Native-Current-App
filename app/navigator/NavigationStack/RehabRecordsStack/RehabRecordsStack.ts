import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from './navigationOptionsConfig';
import CameraScreen, { navigationOptions as CameraScreenNavigationOptions }  from "../../../screens/Camera";
import CameraPhotoAddScreen, { navigationOptions as CameraPhotoAddScreenNavigationOptions }  from "../../../screens/CameraPhotoAdd";
import CameraPhotoGalleryScreen, { navigationOptions as CameraPhotoGalleryScreenNavigationOptions }  from "../../../screens/CameraPhotoGallery";
import CameraPhotoReviewScreen, { navigationOptions as CameraPhotoReviewScreenNavigationOptions }  from "../../../screens/CameraPhotoReview";
import CameraPhotoUploadScreen, { navigationOptions as CameraPhotoUploadScreenNavigationOptions }  from "../../../screens/CameraPhotoUpload";
import CreateRehabScreen, { navigationOptions as CreateRehabScreenNavigationOptions }  from "../../../screens/CreateRehab";
import FullRemodelSummaryScreen, { navigationOptions as FullRemodelSummaryScreenNavigationOptions } from "../../../screens/FullRemodelSummary";
import ProfitSummaryScreen, { navigationOptions as ProfitSummaryScreenNavigationOptions } from "../../../screens/ProfitSummary";
import RehabRecordsScreen, { navigationOptions as RehabRecordsScreenNavigationOptions } from "../../../screens/RehabRecords";
import RehabRecordsDetailScreen, { navigationOptions as RehabRecordsDetailScreenNavigationOptions } from "../../../screens/RehabRecordsDetail";
import RehabQuotationScreen, { navigationOptions as RehabQuotationScreenNavigationOptions } from "../../../screens/RehabQuotation";

const RehabRecordsStack = createStackNavigator({ 
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: CameraScreenNavigationOptions,
  },
  CameraPhotoAddScreen: {
    screen: CameraPhotoAddScreen,
    navigationOptions: CameraPhotoAddScreenNavigationOptions,
  },
  CameraPhotoGalleryScreen: {
    screen: CameraPhotoGalleryScreen,
    navigationOptions:CameraPhotoGalleryScreenNavigationOptions,
  },
  CameraPhotoReviewScreen: {
    screen: CameraPhotoReviewScreen,
    navigationOptions:CameraPhotoReviewScreenNavigationOptions,
  },
  CameraPhotoUploadScreen: {
    screen: CameraPhotoUploadScreen,
    navigationOptions: CameraPhotoUploadScreenNavigationOptions,
  },
  CreateRehabScreen: {
    screen: CreateRehabScreen,
    navigationOptions: CreateRehabScreenNavigationOptions,
  },
  FullRemodelSummaryScreen: {
    screen: FullRemodelSummaryScreen,
    navigationOptions: FullRemodelSummaryScreenNavigationOptions,
  },
  ProfitSummaryScreen: {
    screen: ProfitSummaryScreen,
    navigationOptions: ProfitSummaryScreenNavigationOptions,
  },
  RehabRecordsScreen: {
    screen: RehabRecordsScreen,
    navigationOptions: RehabRecordsScreenNavigationOptions,
  },
  RehabRecordsDetailScreen: {
    screen: RehabRecordsDetailScreen,
    navigationOptions: RehabRecordsDetailScreenNavigationOptions,
  },
  RehabQuotationScreen: {
    screen: RehabQuotationScreen,
    navigationOptions: RehabQuotationScreenNavigationOptions,
  },
}, { initialRouteName: "RehabRecordsScreen" });

RehabRecordsStack.navigationOptions = navigationOptions;

export default RehabRecordsStack;