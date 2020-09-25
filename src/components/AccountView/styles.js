import { StyleSheet } from 'react-native';

// global
import ZIndex from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    // height: '100%',
    zIndex: ZIndex.account,

    backgroundColor: 'white'
  }
});
