import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Button, ButtonProps, Title } from 'react-native-paper';

import styles from './styles';
import FiximizeImage from './fiximizeImage.png';

interface LoginViewProps {
  handleOnPress: ButtonProps['onPress'];
};

const LoginView: React.ComponentType<LoginViewProps> = (props) => {
  const { handleOnPress } = props;
  // console.log("FiximizeImage", FiximizeImage)
  React.useEffect(() => {
    console.log("LoginView Mount")
    return () => {console.log("LoginView UnMount")}
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewBox3} />
      <Image
        resizeMethod="scale"
        source={FiximizeImage}
        style={styles.imageContainer}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.viewBox2} />
      <Title>Please Login to get the estimate price.</Title>
      <View style={styles.viewBox1} />
      <Button 
        mode="contained" 
        onPress={handleOnPress}
        style={styles.nextButton}
      >
        {`LOGIN`}
      </Button>
      <View style={styles.viewBox3} />
    </View>
  );
}
export default React.memo(LoginView);