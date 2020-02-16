import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from './navigationOptionsConfig';
import ProfileScreen from "../../../screens/Profile";

const ProfileStack = createStackNavigator({ ProfileScreen });

ProfileStack.navigationOptions = navigationOptions;

export default ProfileStack;