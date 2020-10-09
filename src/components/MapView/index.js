import React, { useRef, useState, useCallback } from 'react';
import { View, Keyboard, BackHandler } from 'react-native';

// components
import Map from 'components/Map';
import RouteInfo from 'components/RouteInfo';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
import AnimatedImageButton from 'components/AnimatedImageButton';

// utils
import getRoute from 'utils/getRoute';
import UserLocation from 'utils/userLocation';

// global
import { EMapViewStatus } from 'global/enum';

// assets
import back from 'assets/images/back.png';
import avatar from 'assets/images/dead.png';

// styles
import styles from './styles';

function MapView(props) {
  const descriptionRef = useRef(null);

  const [emergency, setEmergency] = useState(1);
  const [isPicking, setIsPicking] = useState(false);
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startLocation, setStartLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [routeToDestination, setRouteToDestination] = useState(null);
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

  function clearRouteDescription() {
    setEmergency(1);
    setDescription('');
  }

  function clearPickedLocation() {
    setPickedLocation(null);
    setRoutesToPickedLocation(null);
    setSelectedRouteToPickedLocation(null);
  }

  function clearDestination() {
    setDestination(null);
    setStartLocation(null);
    setRouteToDestination(null);
  }

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
  }, [mapViewStatus, setMapViewStatus]);

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
          in={mapViewStatus !== EMapViewStatus.searching}
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
        destination={destination}
        startLocation={startLocation}
        pickedLocation={pickedLocation}
        routeToDestination={routeToDestination}
        routesToPickedLocation={routesToPickedLocation}
        selectedRouteToPickedLocation={selectedRouteToPickedLocation}
        setSelectedRouteToPickedLocation={setSelectedRouteToPickedLocation}
        toggleRouteInfo={() => {
          if (mapViewStatus === EMapViewStatus.clear) {
            setEmergency(routeToDestination.properties.emergency);
            setDescription(routeToDestination.properties.description);

            setMapViewStatus(EMapViewStatus.destinationInfo);
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            setMapViewStatus(EMapViewStatus.clear);

            clearRouteDescription();
          }
        }}
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
              setMapViewStatus(EMapViewStatus.clear);
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
        descriptionRef={descriptionRef}
        show={
          mapViewStatus === EMapViewStatus.selectingRoute ||
          mapViewStatus === EMapViewStatus.destinationInfo
        }
        location={
          mapViewStatus === EMapViewStatus.selectingRoute
            ? pickedLocation
            : destination
        }
        route={
          mapViewStatus === EMapViewStatus.selectingRoute
            ? routesToPickedLocation.find(
                route => route.properties.id === selectedRouteToPickedLocation
              )
            : routeToDestination
        }
        description={[description, setDescription]}
        emergency={[emergency, setEmergency]}
        updateDestinationInfo={
          mapViewStatus === EMapViewStatus.selectingRoute
            ? null
            : em => {
                const route = { ...routeToDestination };

                route.properties.emergency = em || emergency;
                route.properties.description = description;

                setRouteToDestination(route);

                /* PATCH route to server */
              }
        }
        useButton={
          mapViewStatus === EMapViewStatus.selectingRoute ? 'use' : 'finish'
        }
        onClose={() => {
          setMapViewStatus(EMapViewStatus.clear);

          clearRouteDescription();

          if (mapViewStatus === EMapViewStatus.selectingRoute) {
            clearPickedLocation();
          }
        }}
        onUse={() => {
          if (mapViewStatus === EMapViewStatus.selectingRoute) {
            /* Set Destinaion */
            const startLocation = UserLocation.currentLocation;
            const routeToDestination = routesToPickedLocation.find(
              route => route.properties.id === selectedRouteToPickedLocation
            );
            routeToDestination.properties = {
              ...routeToDestination.properties,
              ...{
                emergency: emergency,
                description: description,
                destination: pickedLocation,
                startLocation: startLocation
                // createdBy: user
              }
            };

            setStartLocation(startLocation);
            setDestination(pickedLocation);
            setRouteToDestination(routeToDestination);

            /* POST route to server */

            clearPickedLocation();
            setMapViewStatus(EMapViewStatus.destinationInfo);
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            /* Close route */

            /* DELETE route to server */
            clearRouteDescription();
            clearDestination();

            setMapViewStatus(EMapViewStatus.clear);
          }
        }}
      />
    </View>
  );
}

export default MapView;
