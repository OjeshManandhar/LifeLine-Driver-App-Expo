export const SocketText = {
  operations: {
    create: 'create',
    delete: 'delete',
    update: 'update'
  },
  events: {
    driverLocation: 'driver_gps',
    obstructions: 'obstructions',
    driverRoutes: 'driver_routes',
    trafficLocation: 'traffic_gps'
  }
};

export const LoginText = {
  button: 'Log In',
  form: {
    phoneNumber: 'Phone Number',
    password: 'Password'
  },
  signUp: {
    title: 'Sign Up',
    detail: 'Please contact the admin to register you to the App. \nThank You!'
  },
  errorText: {
    noAccount: 'Phone number is not registered yet',
    noNetwork: 'Please check your internet connection',
    phonePassError: 'Phone number and Password does not match'
  }
};

export const GPSPermission = {
  title: 'App GPS Permission',
  message:
    'App needs access to your location (GPS & Internet) so we can pin-point your exact location.',
  buttonNegative: 'No, thanks',
  buttonPosition: 'OK'
};

export const MapScreenText = {
  logoutAlert: {
    title: 'Log Out',
    description: 'Are you sure you want to Log out?',
    negative: 'Cancel',
    positive: 'Log out'
  }
};

export const AccountViewText = {
  button: 'Log Out',
  accountType: {
    driver: 'Driver Account',
    traffic: 'Traffic Account'
  }
};

export const SearchBoxText = {
  placeholder: 'Search here'
};

export const SearchListText = {
  noResult: 'Sorry no results',
  pickOnMap: 'Pick a location on map'
};

export const PickedCoordinateInfoText = {
  loading: 'Loading ...',
  pickText: 'Pick'
};

export const RouteInfoText = {
  use: 'Use this route',
  finish: 'Close this route',
  slider: 'Emergency',
  description: "Patient's Condition"
};
