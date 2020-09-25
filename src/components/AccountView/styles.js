import { StyleSheet } from 'react-native';

// global
import { AccountViewIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    // height: '100%',
    zIndex: AccountViewIndex.base,

    backgroundColor: 'white'
  }
});
