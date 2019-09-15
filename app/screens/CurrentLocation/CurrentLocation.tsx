import React, { useState, useEffect } from 'react';
import { GeolocationError, GeolocationReturnType, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import styles from './styles';

export interface CurrentLocationProps {

};

const CurrentLocation: React.SFC<CurrentLocationProps> = (props) => {
  const [currentLongitude, setCurrentLongitude] = useState<GeolocationReturnType['coords']['longitude']>();
  const [currentLatitude, setCurrentLatitude] = useState<GeolocationReturnType['coords']['latitude']>();
  const [loading, setLoading] = useState(true);
  const longitudeDelta = 0.01;
  const latitudeDelta = 0.01;
  const geo_success: (position: GeolocationReturnType) => void = (position) => {
    console.log({position});
    setCurrentLongitude(position.coords.longitude);
    setCurrentLatitude(position.coords.latitude);
    setLoading(false);
  };
  const geo_error: (error: GeolocationError) => void = (error) => {
    console.log({error})
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
  })
  return (
    <View style={styles.container}>
      {loading ? <Text>Loading</Text> :
          <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta,
            longitudeDelta
        }}>
          {
            <Marker
              coordinate={{ "latitude": currentLatitude, "longitude": currentLongitude}}
              title={"My Location"}
            />
          }
        </MapView>
      }

    </View>
  )
};

export default CurrentLocation;