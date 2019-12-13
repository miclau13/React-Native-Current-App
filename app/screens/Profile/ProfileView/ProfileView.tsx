import React from 'react';
import { FlatList, Linking, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from 'react-native-paper';

import ProfileEmailView from './ProfileEmailView';
import ProfileHeaderView from './ProfileHeaderView';
import ProfileSeparatorView from './ProfileSeparatorView';
import ProfileTelView from './ProfileTelView';
import styles from './styles';

type Address = {
  city: string;
  country: string;
};

type Emails = {
  email: string;
  id: number;
  name: string;
};

type Tels = {
  id: number;
  name: string;
  number: string;
};

interface ProfileViewProps {
  address: string;
  avatar: string;
  avatarBackground: string;
  emails: Emails[];
  handleLogOutOnPress(): void;
  name: string;
  tels: Tels[];
};

const ProfileView: React.ComponentType<ProfileViewProps> = (props) => {
  const { address, avatar, avatarBackground, emails, handleLogOutOnPress, name, tels } = props; 

  const onPressTel = number => {
    // Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err));
  };

  const onPressEmail = email => {
    // Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
    //   console.log('Error:', err)
    // );
  };

  React.useEffect(() => {
    console.log("ProfileView Mount")
    return () => {console.log("ProfileView UnMount")}
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <ProfileHeaderView address={address} avatar={avatar} avatarBackground={avatarBackground} name={name} />
          <FlatList
            contentContainerStyle={styles.telContainer}
            data={tels}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => {
              const { item : { id, name, number }, index } = item;
              return (
                <ProfileTelView
                  index={index}
                  key={`tel-${id}`}
                  name={name}
                  number={number}
                  onPressTel={onPressTel}
                />
              )
            }}
          />
          <ProfileSeparatorView />
          <FlatList
            contentContainerStyle={styles.emailContainer}
            data={emails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => {
              const { item : {email, id, name }, index } = item;
              return (
                <ProfileEmailView
                  email={email}
                  index={index}
                  key={`email-${id}`}
                  name={name}
                  onPressEmail={onPressEmail}
                />
              )
            }}
          />
        </Card>
      </View>
      <Button
        mode="contained" 
        onPress={handleLogOutOnPress}
        style={styles.buttonContainer}
      >
        {"Log Out"}
      </Button>
    </ScrollView>
  )
}
export default React.memo(ProfileView);