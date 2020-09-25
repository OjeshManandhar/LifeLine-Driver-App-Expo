import { StyleSheet } from 'react-native';

// global
import { MapViewIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'relative',

    flex: 1,
    flexDirection: 'column',

    zIndex: MapViewIndex.base
  }
});
