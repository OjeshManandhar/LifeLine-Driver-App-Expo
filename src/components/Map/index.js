import React from 'react';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';

// styles
import { styles } from './styles';

function Map() {
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
