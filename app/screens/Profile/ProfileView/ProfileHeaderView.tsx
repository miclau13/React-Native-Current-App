import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from './styles';

type Address = {
  city: string;
  country: string;
}

interface ProfileHeaderViewProps {
  address: string;
  avatar: string;
  avatarBackground: string;
  name: string;
};

const ProfileHeaderView: React.ComponentType<ProfileHeaderViewProps> = (props) => {
  const { address, avatar, avatarBackground, name } = props; 

  return (
    <View style={styles.headerContainer}>
    <ImageBackground
      style={styles.headerBackgroundImage}
      blurRadius={10}
      source={{
        uri: avatarBackground,
      }}
    >
      <View style={styles.headerColumn}>
        <Image
          style={styles.userImage}
          source={{
            uri: avatar,
          }}
        />
        <Text style={styles.userNameText}>{name}</Text>
        <View style={styles.userAddressRow}>
          <View>
            <Icon
              name="place"
              underlayColor="transparent"
              iconStyle={styles.placeIcon}
            />
          </View>
          <View style={styles.userCityRow}>
            <Text style={styles.userCityText}>
              {address}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
    </View>
  )
}
export default React.memo(ProfileHeaderView);