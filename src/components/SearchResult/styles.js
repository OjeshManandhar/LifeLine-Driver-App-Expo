import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  distance: {
    width: 60,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  distanceMarker: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  distanceText: {
    fontSize: 12,
    color: Colors.distanceText,
    lineHeight: 12
  },
  description: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',

    paddingRight: 20,

    borderBottomColor: Colors.searchResultBorder
  },
  placeName: {
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 5,
    fontWeight: '500'
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    color: Colors.secondaryText
  }
});
