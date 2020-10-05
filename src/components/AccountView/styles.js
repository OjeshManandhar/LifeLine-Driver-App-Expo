import { StyleSheet } from 'react-native';

// global
import { AccountViewIndex } from 'global/zIndex';
import Colors from 'global/colors';

export default StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // translateX: 10,
    // translateY: 50,
    height: '100%',
    width: '100%',
    zIndex: AccountViewIndex.base,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',
    height: '80%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  avatar: {
    marginBottom: 8,
    marginTop: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    zIndex: 1
  },
  title: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 0.8
  },
  divider: {
    width: '100%',
    height: 1,
    margin: 6
  },
  userInfoContainer: {
    width: '95%',
    borderWidth: 0,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5
  },
  infoTitle: {
    fontSize: 16,
    color: Colors.textBlack,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8
  },
  rowContainer: {
    width: '100%',
    height: 30,
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    // textAlign: 'right',
    width: '48%',
    fontSize: 14,
    color: Colors.primary,
    marginRight: 12
  },
  callButton: {
    // position: 'absolute',
    marginRight: 'auto',
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 58, 58, 0.3)'
  },
  phoneNumber: {},
  accountType: {},
  userName: {},

  buttonContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 38
  },

  logOutButton: {
    width: 150,
    height: 38,
    borderWidth: 0.3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 1.12,
    shadowRadius: 2.22,

    elevation: 1
  },
  logOutButtonContent: {
    fontSize: 16,
    width: '100%',
    height: '100%'
  }
});
