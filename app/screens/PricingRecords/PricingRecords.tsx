import * as SecureStore from 'expo-secure-store';
import { gql } from 'apollo-boost';
import React from 'react';
import { ActivityIndicator, StatusBar, ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { NavigationStackScreenComponent } from "react-navigation-stack";

import { useQuery } from '@apollo/react-hooks';

import styles from './styles';
import LoggedInContext from '../../common/LoggedInContext';

type Params = {
};

type ScreenProps = {};

const MY_REHAB_REQUESTS = gql`
  query MyRehabRequests {
    myRehabRequests {
      postalCode
      package {
        maintainFloor
        enhanceBathroom
        bathroomRemodel {
          bathtub
          showerStall
          toilet
          sink
          vanity
          medicineCabinet
          mirror
          fiberGlassShowerDoor
        }
        bathroomFloorRemodel {
          bathroomFloor
          bathOrShowerWall
          bathroomWall
          bathroomCeiling
          floorOrWallOrCeilingRepairs
        }
      }
    }
  }
`;

const PricingRecords: NavigationStackScreenComponent<Params, ScreenProps> = (props) => {
  const { navigation } = props;
  const { data, error, loading, refetch } = useQuery(MY_REHAB_REQUESTS);

  const bootstrapAsync = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken", {});
    if (!accessToken) {
      navigation.navigate("LoginScreen")
    } else {
      try {
        refetch();
      } catch (e) {
        console.log("PricingRecords e", e)
      }
    }
  };

  const handleItemOnPress = index => (event) => {
    navigation.push("PricingRecordsDetailScreen", { detail: data.myRehabRequests[index]} );
  }

  React.useEffect(() => {
    console.log("PricingRecords Mount");
    bootstrapAsync();
    return () => {console.log("PricingRecords UnMount")}
  }, []);

  // console.log("PricingRecords erorr", error)

  return (
    <View style={styles.container}>
      {loading ?
        <>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </>
        :
        <ScrollView>
          {
            data.myRehabRequests.map((r, i) => (
              <ListItem
                bottomDivider
                chevron
                key={i}
                onPress={handleItemOnPress(i)}
                title={r.package["bathroomRemodel"] ? "Bathroom Remodel" : "Kitchen Remodel"}
                subtitle={`Zip Code: ${r.postalCode}`}
              />
            ))
          }
        </ScrollView>
      }
      
    </View>
  )
};

export default React.memo(PricingRecords);