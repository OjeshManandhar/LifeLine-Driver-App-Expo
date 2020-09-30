import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// styles
import { styles } from './styles';

function Map({
  isPicking,
  pickedLocation,
  routesToPickedLocation,
  selectedRouteToPickedLocation
}) {
  console.log('Map');
  console.log('isPicking:', isPicking);
  console.log('pickedLocation:', pickedLocation);
  console.log('routesToPickedLocation:', routesToPickedLocation);
  console.log('selectedRouteToPickedLocation:', selectedRouteToPickedLocation);
  console.log('------------------------------');

  async function askGPSPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App GPS Permission',
          message:
            'App needs access to your location (GPS & Internet) ' +
            'so we can pin-point your exact location.',
          buttonNegative: 'No, thanks',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('FINE LOCATION Access Granted');
      } else {
        console.log('FINE LOCATION Access Denied');
      }
    } catch (err) {
      console.warn('FINE ACCESS Permission error:', err);
    }
  }

  // For Permission
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(result => {
      if (!result) {
        askGPSPermissions();
      }
    });
  }, []);

  return (
    <MapboxGL.MapView
      // A size must be provided to the MapboxGL.MapView through style prop
      style={styles.container}
      styleURL={MapboxGL.StyleURL.Outdoors}
      compassViewMargins={{ x: 10, y: 90 }}
    >
      <MapboxGL.UserLocation visible showsUserHeadingIndicator />

      <MapboxGL.Camera
        animationMode={'easeTo'}
        animationDuration={1.5 * 1000}
        followUserLocation={true}
        followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
      />
    </MapboxGL.MapView>
  );
}

export default Map;
