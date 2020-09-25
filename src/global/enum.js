export const EMapStatus = Object.freeze({
  clear: 0,
  routeToDestination: 1,
  routesToPickedLocation: 2,
  pickingLocation: 3
});

// export const MapScreenStatus = Object.freeze({
//   mapView: 0,
//   searching: 1,
//   pickingDestinaion: 2,
//   showRouteInfo: 3,
//   addingObstruction: 4,
//   showObstructionInfo: 5
// });

export const EMapScreenStatus = Object.freeze({
  mapView: 0,
  accountView: 1
});

export const EAnimationState = Object.freeze({
  initialRender: 0,
  in: 1,
  out: 2
});
