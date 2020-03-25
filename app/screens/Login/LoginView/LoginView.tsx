import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Button, Title } from 'react-native-paper';

import DemoImage from '../../../../assets/DemoImage.png';
import styles from './styles';
import { LoginViewProps } from '../Login';

const LoginView: React.ComponentType<LoginViewProps> = (props) => {
  const { handleLoginOnPress } = props;

  return (
    <View style={styles.container}>
      <View style={styles.viewBox3} />
      <View style={styles.imageContainer}>
        <Image
          defaultSource={DemoImage}
          resizeMethod="scale"
          resizeMode="contain"
          source={DemoImage}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.viewBox2} />
      <Title>Ready?</Title>
      <View style={styles.viewBox1} />
      <Button 
        mode="contained" 
        onPress={handleLoginOnPress}
        style={styles.nextButton}
      >
        {`Sign Up or Login`}
      </Button>
      <View style={styles.viewBox3} />
    </View>
  );
}
export default React.memo(LoginView);