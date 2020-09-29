import React, { useState, useCallback } from 'react';
import { View, Keyboard } from 'react-native';

// components
import Map from 'components/Map';
import SearchBox from 'components/SearchBox';
import AnimatedImageButton from 'components/AnimatedImageButton';

// assets
import back from 'assets/images/back.png';
import avatar from 'assets/images/dead.png';

// global
import { EMapViewStatus } from 'global/enum';

// styles
import styles from './styles';

function MapView(props) {
  const [searchKeyword, setSearchKeyword] = useState('');

  // status
  const [mapViewStatus, _setMapViewStatus] = useState(EMapViewStatus.clear);

  const setMapViewStatus = useCallback(
    val => {
      if (val !== EMapViewStatus.searching) {
        // Also blurs out of the Text Input
        Keyboard.dismiss();
      }

      _setMapViewStatus(val);
    },
    [mapViewStatus, _setMapViewStatus]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <AnimatedImageButton
          in={
            mapViewStatus === EMapViewStatus.searching ||
            mapViewStatus === EMapViewStatus.picking
          }
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
            setMapViewStatus(EMapViewStatus.clear);
          }}
        />

        <SearchBox
          toAccount={props.toAccount}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          onFocus={() => setMapViewStatus(EMapViewStatus.searching)}
        />

        <AnimatedImageButton
          in={
            mapViewStatus === EMapViewStatus.clear && searchKeyword.length === 0
          }
          image={avatar}
          timeout={0.25 * 1000}
          imageStyles={styles.avatar}
          animationStyles={{
            enter: {
              opacity: [0, 1],
              marginLeft: [20, 40]
            },
            exit: {
              opacity: [1, 0],
              marginLeft: [40, 20]
            }
          }}
          onPress={props.toAccount}
        />
      </View>

      <Map />
    </View>
  );
}

export default MapView;
