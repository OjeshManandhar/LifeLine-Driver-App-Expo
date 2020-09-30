import React from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';

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
          {data.distance && (
            <Text style={styles.distanceText}>{data.distance} km</Text>
          )}
        </View>
        <View style={[styles.description, { borderBottomWidth: last ? 0 : 1 }]}>
          <Text style={styles.placeName} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.placeLocation} numberOfLines={1}>
            {data.location}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default SearchResult;
