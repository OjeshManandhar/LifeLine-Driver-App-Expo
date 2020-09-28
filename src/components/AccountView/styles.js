import { StyleSheet } from 'react-native';

// global
import { AccountViewIndex } from 'global/zIndex';

export default StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // height: '100%',
    zIndex: AccountViewIndex.base,

    backgroundColor: 'white'
  },
  container: {
    position: 'relative',

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,

    width: 25,
    height: 25
  },
  avatar: {
    margin: 10,
    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'black'
  },
  accountType: {},
  userName: {},
  phoneNumber: {},
  logOutButton: {
    width: 150,
    height: 45,
    margin: 10,
    borderRadius: 10
  },
  logOutButtonContent: {
    fontSize: 18,
    width: '100%',
    height: '100%'
  }
});
