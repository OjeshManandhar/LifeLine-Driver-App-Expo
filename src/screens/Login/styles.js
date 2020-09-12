import { StyleSheet } from 'react-native';

// global
import GlobalZIndex from 'global/zIndex';

const ZIndex = {
  curve: 100,
  formContainer: 200
};

export default StyleSheet.create({
  container: {
    position: 'relative',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: GlobalZIndex.login
  },
  topCurve: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    zIndex: ZIndex.curve
  },
  formContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',

    zIndex: ZIndex.formContainer,

    borderWidth: 1,
    borderColor: 'black'
  },
  logo: {
    marginBottom: 15
  },
  textBox: {
    width: 275,
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
  loginButton: {
    width: 275,
    height: 40,
    borderRadius: 10,
    marginBottom: 10
  },
  loginButtonContent: {
    width: '100%',
    height: '100%'
  },
  signUpContainer: {
    flexDirection: 'row'
  },
  bottomCurve: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: ZIndex.curve
  }
});
