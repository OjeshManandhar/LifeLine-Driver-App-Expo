import React, { useRef, useEffect, useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';
import { point, featureCollection } from '@turf/helpers';

// utils
import UserLocation from 'utils/userLocation';

// assets
import startMarker from 'assets/images/map/startMarker.png';
import destinationMarker from 'assets/images/map/destinationMarker.png';
import obstructionMarker from 'assets/images/map/obstructionMarker.png';
import pickedLocationMarker from 'assets/images/map/pickedLocationMarker.png';

// global
import Colors from 'global/colors';
import { MapLayerIndex } from 'global/zIndex';

// styles
import { styles, layerStyles } from './styles';

function Map({
  isPicking,
  destination,
  startLocation,
  pickedLocation,
  obstructionList,
  toggleRouteInfo,
  pickedCoordinate,
  routeToDestination,
  setPickedCoordintate,
  toggleObstructionInfo,
  setSelectedObstruction,
  routesToPickedLocation,
  selectedRouteToPickedLocation,
  setSelectedRouteToPickedLocation
}) {
  const cameraRef = useRef(null);

  async function askGPSPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App GPS Permission',
          message:
            'App needs access to your location (GPS & Internet) ' +
            'so we can pin-point your exact location.',
          buttonNegative: 'No, thanks',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('FINE LOCATION Access Granted');
      } else {
        console.log('FINE LOCATION Access Denied');
      }
    } catch (err) {
      console.warn('FINE ACCESS Permission error:', err);
    }
  }

  // For Permission
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(result => {
      if (!result) {
        askGPSPermissions();
      }
    });
  }, []);

  const renderPickedLocation = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='PickedLocationMarker-Source'
        shape={pickedLocation}
      >
        <MapboxGL.SymbolLayer
          id='PickedLocationMarker-Layer'
          sourceID='PickedLocationMarker-Source'
          style={layerStyles.pickedLocationMarker}
          layerIndex={MapLayerIndex.pickedLocationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [pickedLocation]);

  const renderRoutesToPickedLocation = useCallback(() => {
    const selected = routesToPickedLocation.find(
      route => route.properties.id === selectedRouteToPickedLocation
    );
    const notSelected = routesToPickedLocation.filter(
      route => route.properties.id !== selectedRouteToPickedLocation
    );

    const shape = [];

    if (notSelected.length > 0) {
      shape.push(
        <MapboxGL.ShapeSource
          key={0}
          id='RoutesToPickedLocation-Source'
          shape={featureCollection(notSelected)}
          onPress={data =>
            setSelectedRouteToPickedLocation(data.features[0].properties.id)
          }
        >
          <MapboxGL.LineLayer
            id='RoutesToPickedLocation'
            sourceID='RoutesToPickedLocation-Source'
            style={layerStyles.routesToPickedLocation}
            layerIndex={MapLayerIndex.routesToPickedLocation}
          />
        </MapboxGL.ShapeSource>
      );
    }

    if (selected) {
      shape.push(
        <MapboxGL.ShapeSource
          key={1}
          id='SelectedRouteToPickedLocation-Source'
          shape={selected}
        >
          <MapboxGL.LineLayer
            id='SelectedRouteToPickedLocation'
            // aboveLayerID='RoutesToPickedLocation'
            sourceID='SelectedRouteToPickedLocation-Source'
            style={layerStyles.selectedRouteToPickedLocation}
            layerIndex={MapLayerIndex.selectedRouteToPickedLocation}
          />
        </MapboxGL.ShapeSource>
      );
    }

    return shape;
  }, [routesToPickedLocation, selectedRouteToPickedLocation]);

  const renderPickedCoordinate = useCallback(() => {
    return (
      <MapboxGL.PointAnnotation
        id='user-picked-location'
        title='Picked DEstination'
        coordinate={pickedCoordinate}
      />
    );
  }, [pickedCoordinate]);

  const renderStartLocation = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='startLocationMarker-Source'
        shape={point(startLocation)}
        onPress={toggleRouteInfo}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.startLocationMarker}
          id='startLocationMarker-Layer'
          sourceID='startLocationMarker-Source'
          layerIndex={MapLayerIndex.startLocationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [startLocation, toggleRouteInfo]);

  const renderDestination = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='destinationMarker-Source'
        shape={destination}
        onPress={toggleRouteInfo}
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.destinationMarker}
          id='destinationMarker-Layer'
          sourceID='destinationMarker-Source'
          layerIndex={MapLayerIndex.destinationMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [destination, toggleRouteInfo]);

  const renderRouteToDestination = useCallback(() => {
    return (
      <MapboxGL.ShapeSource
        id='routeToDestination-Source'
        shape={routeToDestination}
        onPress={toggleRouteInfo}
      >
        <MapboxGL.LineLayer
          id='routeToDestination-Layer'
          sourceID='routeToDestination-Source'
          style={{
            ...layerStyles.routeToDestination,
            ...{
              lineColor:
                Colors[`emergency_${routeToDestination.properties.emergency}`]
            }
          }}
          layerIndex={MapLayerIndex.routeToDestination}
        />
      </MapboxGL.ShapeSource>
    );
  }, [toggleRouteInfo, routeToDestination]);

  const renderObstruction = useCallback(() => {
    const featureCollection = {
      type: 'FeatureCollection',
      features: obstructionList
    };

    return (
      <MapboxGL.ShapeSource
        id='obstructionMarkers-Source'
        shape={featureCollection}
        onPress={data =>
          setSelectedObstruction(currentObstruction => {
            console.log('cur obs:', currentObstruction);
            console.log('press obs:', data.features[0]);

            if (
              !currentObstruction ||
              currentObstruction.properties.id ===
                data.features[0].properties.id
            ) {
              toggleObstructionInfo();
            }

            return data.features[0];
          })
        }
      >
        <MapboxGL.SymbolLayer
          style={layerStyles.obstructionMarker}
          id='obstructionMarker-Layer'
          sourceID='obstructionMarkers-Source'
          layerIndex={MapLayerIndex.obstructionMarker}
        />
      </MapboxGL.ShapeSource>
    );
  }, [obstructionList, toggleObstructionInfo, setSelectedObstruction]);

  const getBounds = useCallback(() => {
    if (!routesToPickedLocation) return null;

    const longitudes = [],
      latitudes = [];

    routesToPickedLocation.forEach(route => {
      route.geometry.coordinates.forEach(coordinate => {
        longitudes.push(coordinate[0]);
        latitudes.push(coordinate[1]);
      });
    });

    const north = Math.max(...longitudes),
      south = Math.min(...longitudes),
      east = Math.max(...latitudes),
      west = Math.min(...latitudes);

    // for arguments to MapboxGl.Camera
    // return {
    //   ne: [north, east],
    //   sw: [south, west],
    //   // paddingTop: 10,
    //   // paddingLeft: 10,
    //   // paddingBottom: 10,
    //   // paddingRight: 10,
    //   animationDuration: 1.5 * 1000
    // };

    // for MapboxGl.Camera.fitBounds
    return [[north, east], [south, west], 0, 1.5 * 1000];
  }, [routesToPickedLocation]);

  const updateCamera = useCallback(() => {
    const cam = cameraRef.current;

    if (!cam) return null;

    const bounds = getBounds();

    if (bounds) {
      cam.fitBounds(...bounds);
    } else {
      cam.setCamera({
        centerCoordinate: UserLocation.currentLocation
      });
    }
  }, [getBounds]);

  return (
    <MapboxGL.MapView
      // A size must be provided to the MapboxGL.MapView through style prop
      style={styles.container}
      styleURL={MapboxGL.StyleURL.Outdoors}
      compassViewMargins={{ x: 10, y: 90 }}
      onPress={
        isPicking
          ? data => setPickedCoordintate(data.geometry.coordinates)
          : undefined
      }
    >
      <MapboxGL.UserLocation visible animated showsUserHeadingIndicator />

      <MapboxGL.Camera
        ref={cameraRef}
        animationMode={'easeTo'}
        animationDuration={1.5 * 1000}
        followUserLocation={!routesToPickedLocation}
        followUserMode={
          destination && routeToDestination
            ? MapboxGL.UserTrackingModes.FollowWithHeading
            : MapboxGL.UserTrackingModes.FollowWithCourse
        }
        followZoomLevel={destination && routeToDestination ? 15 : 14}
      />

      <MapboxGL.Images
        images={{
          startMarker: startMarker,
          destinationMarker: destinationMarker,
          obstructionMarker: obstructionMarker,
          pickedLocationMarker: pickedLocationMarker
        }}
      />

      {cameraRef.current && updateCamera()}

      {pickedLocation && renderPickedLocation()}
      {routesToPickedLocation && renderRoutesToPickedLocation()}

      {isPicking && pickedCoordinate && renderPickedCoordinate()}

      {startLocation && renderStartLocation()}
      {destination && renderDestination()}
      {routeToDestination && renderRouteToDestination()}

      {obstructionList.length !== 0 && renderObstruction()}
    </MapboxGL.MapView>
  );
}

export default Map;
