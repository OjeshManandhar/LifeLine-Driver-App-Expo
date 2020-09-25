import React from 'react';
import { View, Button } from 'react-native';

// components
import Map from 'components/Map';

// styles
import styles from './styles';

function MapView(props) {
  return (
    <View style={styles.container}>
      <Map />
      <Button title='Account' onPress={props.toAccount} />
    </View>
  );
}

export default MapView;
