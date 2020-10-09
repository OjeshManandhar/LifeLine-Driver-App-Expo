export const EAnimationState = Object.freeze({
  initialRender: 0,
  in: 1,
  out: 2
});

export const EMapScreenStatus = Object.freeze({
  mapView: 0,
  accountView: 1
});

export const EMapViewStatus = Object.freeze({
  clear: 0,
  searching: 1,
  picking: 2,
  selectingRoute: 3,
  destinationInfo: 4,
  obstructionInfo: 5
});
