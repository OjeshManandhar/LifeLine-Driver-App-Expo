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

export const MapLayerIndex = {
  // 125 => layerIndex of the users location indicator
  // so make other below 125

  routeToPickedLocation: 100,
  selectedRouteToPickedLocation: 105,
  obstructionMarker: 110,
  routeToDestination: 120,
  startLocationMarker: 124,
  destinationMarker: 125
};
