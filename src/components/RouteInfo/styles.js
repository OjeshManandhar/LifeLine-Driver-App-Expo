import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { RouteInfoIndex } from 'global/zIndex';

export const ContainerHeight = 170;

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: ContainerHeight,
    zIndex: RouteInfoIndex.base,

    borderRadius: 5,

    backgroundColor: Colors.normalBG,

    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3
  },
  placeName: {
    flex: 1,
    fontSize: 23,
    lineHeight: 23,
    fontWeight: '500',
    marginRight: 15
  },
  cross: {
    width: 20,
    height: 20
  },
  placeLocation: {
    fontSize: 13,
    lineHeight: 13,
    marginBottom: 5,
    color: Colors.secondaryText
  },
  routeText: {
    fontSize: 18.5,
    lineHeight: 18.5
    // marginBottom: 5
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 3
  },
  description: {
    fontSize: 18,

    paddingHorizontal: 0,
    backgroundColor: 'transparent',

    marginTop: -10,
    marginBottom: 5
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'red'
  },
  slider: {},
  useButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '100%',
    borderRadius: 50,
    paddingHorizontal: 17.5,

    backgroundColor: Colors.useButtonBackground
  },
  useIcon: {
    width: 18.5,
    height: 18.5,
    marginRight: 10
  },
  useText: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.useButtonText,

    margin: 0,
    padding: 0
  },
  searchingText: {
    color: Colors.secondaryText,
    fontSize: 20,
    lineHeight: 20
  }
});
