import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from './styles';

interface ProfileEmailViewProps {
  index: React.ReactText;
  name: string;
  email: string;
  onPressEmail(email: string): void;
};

const ProfileEmailView: React.ComponentType<ProfileEmailViewProps> = (props) => {
  const { index, name, email, onPressEmail } = props; 

  const handleEmailOnPress = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    onPressEmail(email);
  }, [onPressEmail, email])

  React.useEffect(() => {
    console.log("ProfileEmailView Mount")
    return () => {console.log("ProfileEmailView UnMount")}
  }, []);

  return (
    <TouchableOpacity onPress={handleEmailOnPress}>
      <View style={[styles.container, styles.emailContainer]}>
        <View style={styles.iconRow}>
          {+index === 0 && (
            <Icon
              name="email"
              underlayColor="transparent"
              iconStyle={styles.emailIcon}
              onPress={handleEmailOnPress}
            />
          )}
        </View>
        <View style={styles.emailRow}>
          <View style={styles.emailColumn}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <View style={styles.emailNameColumn}>
            {name.trim().length !== 0 && (
              <Text style={styles.emailNameText}>{name}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ProfileEmailView);