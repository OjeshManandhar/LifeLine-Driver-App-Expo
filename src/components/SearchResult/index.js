import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

// components
import Text from 'components/Text';

// assets
import pin from 'assets/images/search/pin.png';

// styles
import styles from './styles';

function SearchResult({ data, last, setPickedLocation }) {
  return (
    <TouchableNativeFeedback onPress={() => setPickedLocation(data)}>
      <View style={styles.container}>
        <View style={styles.distance}>
          <Image source={pin} style={styles.distanceMarker} />
          {data.properties.distance && (
            <Text style={styles.distanceText}>
              {data.properties.distance} km
            </Text>
          )}
        </View>
        <View style={[styles.description, { borderBottomWidth: last ? 0 : 1 }]}>
          <Text style={styles.placeName} numberOfLines={1}>
            {data.properties.name}
          </Text>
          <Text style={styles.placeLocation} numberOfLines={1}>
            {data.properties.location}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default SearchResult;
