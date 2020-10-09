export const LoginIndex = {
  base: 1,
  curve: 100,
  formContainer: 200
};

const MapScreenIndex = {
  map: 1,
  account: 101
};

export const MapViewIndex = {
  base: MapScreenIndex.map,
  map: 100,
  bottomInfoBox: 101,
  searchList: 201,
  searchBox: 301
};

export const SearchListIndex = {
  base: MapViewIndex.searchList
};

export const AccountViewIndex = {
  base: MapScreenIndex.account
};

export const PickedCoordinateInfoIndex = {
  base: MapViewIndex.bottomInfoBox
};

export const RouteInfoIndex = {
  base: MapViewIndex.bottomInfoBox
};

export const MapLayerIndex = {
  // 125 => layerIndex of the users location indicator
  // so make other below 125

  routesToPickedLocation: 100,
  selectedRouteToPickedLocation: 105,
  pickedLocationMarker: 110,
  obstructionMarker: 115,
  routeToDestination: 120,
  startLocationMarker: 124,
  destinationMarker: 125
};
