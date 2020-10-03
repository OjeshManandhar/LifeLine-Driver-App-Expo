import { StyleSheet } from 'react-native';

// global
import { RouteInfoIndex } from 'global/zIndex';

export const ContainerHeight = 150;

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: ContainerHeight,
    zIndex: RouteInfoIndex.base,

    backgroundColor: '#ffffff',
    borderRadius: 5,

    padding: 10
  }
});
