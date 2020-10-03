import React, { useState, useCallback } from 'react';
import { View, Keyboard, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import RouteInfo from 'components/RouteInfo';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
import AnimatedImageButton from 'components/AnimatedImageButton';

// utils
import getRoute from 'utils/getRoute';

// global
import { EMapViewStatus } from 'global/enum';
import { RouteInfoText } from 'global/strings';

// assets
import back from 'assets/images/back.png';
import avatar from 'assets/images/dead.png';
import use from 'assets/images/routeInfo/use.png';
import finish from 'assets/images/routeInfo/finish.png';

// styles
import styles from './styles';

function MapView(props) {
  const [isPicking, setIsPicking] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pickedLocation, setPickedLocation] = useState(null);
  const [routesToPickedLocation, setRoutesToPickedLocation] = useState(null);
  const [
    selectedRouteToPickedLocation,
    setSelectedRouteToPickedLocation
  ] = useState(null);

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

  const clearPickedLocation = useCallback(() => {
    setPickedLocation(null);
    setRoutesToPickedLocation(null);
    setSelectedRouteToPickedLocation(null);
  }, [
    setPickedLocation,
    setRoutesToPickedLocation,
    setSelectedRouteToPickedLocation
  ]);

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

      <Map
        isPicking={isPicking}
        pickedLocation={pickedLocation}
        routesToPickedLocation={routesToPickedLocation}
        selectedRouteToPickedLocation={selectedRouteToPickedLocation}
        setSelectedRouteToPickedLocation={setSelectedRouteToPickedLocation}
      />

      <SearchList
        in={mapViewStatus === EMapViewStatus.searching}
        searchKeyword={searchKeyword}
        setPickedLocation={data => {
          setPickedLocation(data);

          getRoute(data.coordinate)
            .then(routes => {
              // console.log('routes:', routes);

              setRoutesToPickedLocation(routes);
              setSelectedRouteToPickedLocation(routes[0].properties.id);

              setMapViewStatus(EMapViewStatus.selectingRoute);
            })
            .catch(error => {
              console.log('No routes Found:', error);
            });
        }}
        switchToPicking={() => {
          console.log('Switch to Picking');

          // setIsPickingLocation(true);

          // setPickedCoordintate(null);
          // setMapScreenStatus(MapScreenStatus.pickingDestinaion);
        }}
      />

      <RouteInfo
        in={mapViewStatus === EMapViewStatus.selectingRoute}
        location={pickedLocation}
        route={
          mapViewStatus === EMapViewStatus.selectingRoute
            ? routesToPickedLocation.find(
                route => route.properties.id === selectedRouteToPickedLocation
              )
            : mapViewStatus === EMapViewStatus.destinationInfo
            ? null
            : null
        }
        useButton={(() => {
          if (mapViewStatus === EMapViewStatus.selectingRoute) {
            return { image: use, text: RouteInfoText.use };
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            return { image: finish, text: RouteInfoText.finish };
          }
        })()}
        onClose={() => {
          if (mapViewStatus === EMapViewStatus.selectingRoute) {
            clearPickedLocation();
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            // clearDestination();
          }

          setMapViewStatus(EMapViewStatus.clear);
        }}
        onUse={() => {
          if (mapViewStatus === EMapViewStatus.selectingRoute) {
            // modify routeToDestination.properties
            // set destination
            setMapViewStatus(EMapViewStatus.destinationInfo);
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            // close the route
            setMapViewStatus(EMapViewStatus.clear);
          }
        }}
      />
    </View>
  );
}

export default MapView;
