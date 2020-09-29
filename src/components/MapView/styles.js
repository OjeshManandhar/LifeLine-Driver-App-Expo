import { StyleSheet } from 'react-native';

// global
import Colors from 'global/colors';
import { MapViewIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'relative',

    flex: 1,
    flexDirection: 'column',

    zIndex: MapViewIndex.base
  },
  topContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    right: 10,
    height: 50,
    zIndex: MapViewIndex.searchBox,

    overflow: 'hidden',

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    paddingVertical: 5,
    paddingHorizontal: 20,

    borderRadius: 4,
    borderWidth: 0.25,
    borderColor: '#555555',
    backgroundColor: '#ffffff',

    /**
     * For shadow in Android
     * Will be on top even though z-index of this component is lower
     * It will not handle touch i.e. the touch input will be passed to the
     * component below it like in z-index
     */
    elevation: 3
  },
  backIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginRight: 20
  },
  avatar: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginLeft: 15,

    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary
  }
});
