import React, { useState } from 'react';
import { View, Button } from 'react-native';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';

// global
import { EMapViewStatus } from 'global/enum';

// styles
import styles from './styles';

function MapView(props) {
  const [mapViewStatus, setMapViewStatus] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <AnimatedImageButton
          // in={
          //   mapViewStatus === EMapViewStatus.searching ||
          //   mapViewStatus === EMapViewStatus.picking
          // }
          in
          image={back}
          timeout={0.25 * 1000}
          imageStyles={styles.backIcon}
          animationStyles={{
            enter: {
              opacity: [0, 1],
              marginLeft: [-40, 0]
            },
            exit: {
              opacity: [1, 0],
              marginLeft: [0, -40]
            }
          }}
          onPress={() => {
            console.log('Back');
          }}
        />
      </View>

      <Map />

      <Button title='Account' onPress={props.toAccount} />
    </View>
  );
}

export default MapView;
