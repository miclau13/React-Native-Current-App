import { NavigationState, NavigationContainerProps } from "react-navigation"; 

const navigationOptions = (props: NavigationContainerProps<NavigationState>) => {
  return { 
    headerLeft: (props) => {
      return (
        null
      );
    }
  }
};

export default navigationOptions;