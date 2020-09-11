import { StyleSheet } from 'react-native';

// global
import ZIndex from 'global/zIndex';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: ZIndex.login
  },
  topCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 20
  },
  textBox: {
    width: 275,
    // height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 18,
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10
  },
  bottomCurve: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  }
});
