import { StyleSheet } from 'react-native';

// global
import { SearchListIndex } from 'global/zIndex';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    // height: '100%',
    zIndex: SearchListIndex.base,

    backgroundColor: '#eeeeee',

    paddingTop: 60
  },
  searchResultGroup: {
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.25,
    borderColor: '#555555',
    backgroundColor: '#ffffff',

    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3
  },
  blockContainer: {
    height: 60,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  blockImageContainer: {
    width: 60,

    justifyContent: 'center',
    alignItems: 'center'
  },
  blockImage: {
    width: 25,
    height: 25
  },
  blockText: {
    fontSize: 17,
    color: 'black',
    lineHeight: 60,
    paddingRight: 20
  }
});
