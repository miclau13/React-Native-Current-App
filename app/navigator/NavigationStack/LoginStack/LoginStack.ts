import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from './navigationOptionsConfig';
import LoginScreen from "../../../screens/Login";

const LoginStack = createStackNavigator(
  { LoginScreen }, 
  { initialRouteName: "LoginScreen" }
);

LoginStack.navigationOptions = navigationOptions;

export default LoginStack;