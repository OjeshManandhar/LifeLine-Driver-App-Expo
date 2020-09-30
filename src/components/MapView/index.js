import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Keyboard, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
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

  // Back handler
  const handleBackButton = useCallback(() => {
    switch (mapViewStatus) {
      case EMapViewStatus.clear:
        BackHandler.exitApp();
        break;
      case EMapViewStatus.searching:
        setMapViewStatus(EMapViewStatus.clear);
        break;
    }
  }, [mapViewStatus, setMapViewStatus, props.allowBackHandler]);

  props.setBackHandler(() => handleBackButton);
  // useEffect(() => props.setBackHandler(() => handleBackButton), [
  //   handleBackButton,
  //   props.setBackHandler
  // ]);

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
          in={mapViewStatus === EMapViewStatus.clear}
          image={avatar}
          timeout={0.25 * 1000}
          imageStyles={styles.avatar}
          animationStyles={{
            enter: {
              opacity: [0, 1],
              marginRight: [-20, 0]
            },
            exit: {
              opacity: [1, 0],
              marginRight: [0, -20]
            }
          }}
          onPress={props.toAccount}
        />
      </View>

      <Map />

      <SearchList
        in={mapViewStatus === EMapViewStatus.searching}
        searchKeyword={searchKeyword}
        setPickedLocation={data => {
          console.log('data:', data);
          // setMapStatus(MapStatus.routesToPickedLocation);
          // setMapScreenStatus(MapScreenStatus.showRouteInfo);

          // setPickedLocation(data);
          getRoute(data.coordinate)
            .then(routes => {
              console.log('routes:', routes);
              // setRoutesToPickedLocation(routes);
              // setSelectedRouteToPickedLocation(routes[0].id);
            })
            .catch(error => {
              console.log('No routes Found:', error);
            });
        }}
        switchToPicking={() => {
          console.log('Switch to Picking');

          // setPickedCoordintate(null);
          // setMapStatus(MapStatus.pickingLocation);
          // setMapScreenStatus(MapScreenStatus.pickingDestinaion);
        }}
      />
    </View>
  );
}

export default MapView;
