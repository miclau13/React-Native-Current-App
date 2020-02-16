import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from './styles';

interface ProfileTelViewProps {
  index: React.ReactText;
  name: string;
  number: string;
  onPressTel(number: string): void;
};

const ProfileTelView: React.ComponentType<ProfileTelViewProps> = (props) => {
  const { index, name, number, onPressTel } = props; 

  const handleTelOnPress = React.useCallback<TouchableOpacityProps['onPress']>(() => {
    onPressTel(number);
  }, [onPressTel, number])

  return (
    <TouchableOpacity onPress={handleTelOnPress}>
      <View style={[styles.container, styles.telContainer]}>
        <View style={styles.iconRow}>
          {+index === 0 && (
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
              onPress={handleTelOnPress}
            />
          )}
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{number}</Text>
          </View>
          <View style={styles.telNameColumn}>
            {name.trim().length !== 0 && (
              <Text style={styles.telNameText}>{name}</Text>
            )}
          </View>
        </View>
        {/* <View style={styles.smsRow}>
          <Icon
            name="textsms"
            underlayColor="transparent"
            iconStyle={styles.smsIcon}
          />
        </View> */}
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(ProfileTelView);