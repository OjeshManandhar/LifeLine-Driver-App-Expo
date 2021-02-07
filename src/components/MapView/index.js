import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Keyboard, BackHandler } from 'react-native';

// packages
import Axios from 'axios';

// components
import Map from 'components/Map';
import Text from 'components/Text';
import RouteInfo from 'components/RouteInfo';
import SearchBox from 'components/SearchBox';
import SearchList from 'components/SearchList';
import ObstructionInfo from 'components/ObstructionInfo';
import AnimatedImageButton from 'components/AnimatedImageButton';
import PickedCoordinateInfo from 'components/PickedCoordinateInfo';

// utils
import socket from 'utils/socket';
import UserInfo from 'utils/userInfo';
import getRoute from 'utils/getRoute';
import UserLocation from 'utils/userLocation';

// global
import { SocketText } from 'global/strings';
import { EMapViewStatus } from 'global/enum';

// assets
import back from 'assets/images/back.png';
import noImage from 'assets/images/noImage.jpg';

// style
import styles from './styles';

// env
import { API_URL, SMALL_IMAGE_ENDPOINT } from '@env';

function MapView(props) {
  const descriptionRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [emergency, setEmergency] = useState(1);
  const [isPicking, setIsPicking] = useState(false);
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState(null);
  const [trafficList, setTrafficList] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startLocation, setStartLocation] = useState(null);
  const [obstructionList, setObstructionList] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [pickedCoordinate, setPickedCoordintate] = useState(null);
  const [routeToDestination, setRouteToDestination] = useState(null);
  const [selectedObstruction, setSelectedObstruction] = useState(null);
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

  // Socket
  useEffect(() => {
    socket.on(SocketText.events.obstructions, data => setObstructionList(data));

    socket.on(SocketText.events.trafficLocations, data => setTrafficList(data));
  }, [setTrafficList, setObstructionList]);

  // avatar
  useEffect(() => {
    async function getImage() {
      Axios.get(`${API_URL}${SMALL_IMAGE_ENDPOINT}/${UserInfo.getContact()}`)
        .then(res => setAvatar(res.data))
        .catch(err => console.log('Fetch image error:', err));
    }

    getImage();
  }, [setAvatar]);

  function clearRouteDescription() {
    setEmergency(1);
    setDescription('');
  }

  function clearPickedCoordinate() {
    setIsPicking(false);
    setPickedCoordintate(null);
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

  const updateDestinationInfo = useCallback(
    em => {
      const route = { ...routeToDestination };

      route.properties.emergency = em || emergency;
      route.properties.description = description;

      /* PATCH route to server */
      socket.emit(SocketText.events.driverRoutes, {
        driver_route: route,
        operation: SocketText.operations.update
      });

      setRouteToDestination(route);
    },
    [emergency, description, mapViewStatus, routeToDestination]
  );

  // Back handler
  const handleBackButton = useCallback(() => {
    switch (mapViewStatus) {
      case EMapViewStatus.clear:
        BackHandler.exitApp();
        break;
      case EMapViewStatus.searching:
        if (pickedLocation) {
          setMapViewStatus(EMapViewStatus.selectingRoute);
        } else {
          setMapViewStatus(EMapViewStatus.clear);
        }
        break;
      case EMapViewStatus.picking:
        if (pickedLocation) {
          setMapViewStatus(EMapViewStatus.selectingRoute);
        } else {
          setMapViewStatus(EMapViewStatus.clear);
        }
        clearPickedCoordinate();
        break;
      case EMapViewStatus.selectingRoute:
        setMapViewStatus(EMapViewStatus.clear);
        clearRouteDescription();
        clearPickedLocation();
        break;
      case EMapViewStatus.destinationInfo:
        const des = descriptionRef.current;
        if (des && des.isFocused()) {
          des.blur();
          updateDestinationInfo();
        }

        setMapViewStatus(EMapViewStatus.clear);
        clearRouteDescription();
        break;
      case EMapViewStatus.obstructionInfo:
        setMapViewStatus(EMapViewStatus.clear);
        setSelectedObstruction(null);
        break;
    }
  }, [mapViewStatus, pickedLocation, setMapViewStatus, updateDestinationInfo]);

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
            if (mapViewStatus === EMapViewStatus.picking) {
              clearPickedCoordinate();
            }

            if (pickedLocation) {
              setMapViewStatus(EMapViewStatus.selectingRoute);
            } else {
              setMapViewStatus(EMapViewStatus.clear);
            }
          }}
        />

        {mapViewStatus === EMapViewStatus.picking ? (
          <View style={styles.topTextContainer}>
            <Text style={styles.topText}>Tap to pick a location</Text>
          </View>
        ) : (
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            onFocus={() => setMapViewStatus(EMapViewStatus.searching)}
          />
        )}

        <AnimatedImageButton
          in={mapViewStatus !== EMapViewStatus.searching}
          image={
            avatar
              ? {
                  uri: avatar
                }
              : noImage
          }
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
          onPress={() => props.toAccount(null)}
        />
      </View>

      <Map
        isPicking={isPicking}
        destination={destination}
        trafficList={trafficList}
        startLocation={startLocation}
        pickedLocation={pickedLocation}
        obstructionList={obstructionList}
        pickedCoordinate={pickedCoordinate}
        routeToDestination={routeToDestination}
        setPickedCoordintate={setPickedCoordintate}
        setSelectedObstruction={setSelectedObstruction}
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
        toggleObstructionInfo={() => {
          if (mapViewStatus === EMapViewStatus.clear) {
            setMapViewStatus(EMapViewStatus.obstructionInfo);
          } else if (mapViewStatus === EMapViewStatus.obstructionInfo) {
            setMapViewStatus(EMapViewStatus.clear);
            setSelectedObstruction(null);
          }
        }}
        toAccount={info => {
          if (mapViewStatus === EMapViewStatus.clear) {
            props.toAccount(info);
          }
        }}
      />

      <SearchList
        in={mapViewStatus === EMapViewStatus.searching}
        searchKeyword={searchKeyword}
        setPickedLocation={data => {
          setPickedLocation(data);

          getRoute(data.geometry.coordinates)
            .then(routes => {
              clearRouteDescription();
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
          setIsPicking(true);
          setPickedCoordintate(null);
          setMapViewStatus(EMapViewStatus.picking);
        }}
      />

      <PickedCoordinateInfo
        show={
          pickedCoordinate != null && mapViewStatus === EMapViewStatus.picking
        }
        pickedCoordinate={pickedCoordinate}
        onUse={data => {
          setPickedLocation(data);

          getRoute(data.geometry.coordinates)
            .then(routes => {
              clearRouteDescription();
              setRoutesToPickedLocation(routes);
              setSelectedRouteToPickedLocation(routes[0].properties.id);

              setMapViewStatus(EMapViewStatus.selectingRoute);
            })
            .catch(error => {
              console.log('No routes Found:', error);
              setMapViewStatus(EMapViewStatus.clear);
            });

          setPickedCoordintate(null);
          setIsPicking(false);
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
          mapViewStatus === EMapViewStatus.destinationInfo
            ? updateDestinationInfo
            : null
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
                startLocation: startLocation,
                contact: UserInfo.getContact()
              }
            };

            setStartLocation(startLocation);
            setDestination(pickedLocation);
            setRouteToDestination(routeToDestination);

            /* POST route to server */
            socket.emit(SocketText.events.driverRoutes, {
              driver_route: routeToDestination,
              operation: SocketText.operations.update
            });

            clearPickedLocation();
            setMapViewStatus(EMapViewStatus.destinationInfo);
          } else if (mapViewStatus === EMapViewStatus.destinationInfo) {
            /* DELETE route to server */
            socket.emit(SocketText.events.driverRoutes, {
              driver_route: routeToDestination,
              operation: SocketText.operations.delete
            });

            clearRouteDescription();
            clearDestination();

            setMapViewStatus(EMapViewStatus.clear);
          }
        }}
      />

      <ObstructionInfo
        show={mapViewStatus === EMapViewStatus.obstructionInfo}
        selectedObstruction={selectedObstruction}
        onClose={() => setMapViewStatus(EMapViewStatus.clear)}
      />
    </View>
  );
}

export default MapView;
