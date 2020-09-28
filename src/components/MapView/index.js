import React from 'react';
import { View, Button } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';

// styles
import styles from './styles';

function MapView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Top Container</Text>
      </View>

      <Map />

      <Button title='Account' onPress={props.toAccount} />
    </View>
  );
}

export default MapView;
