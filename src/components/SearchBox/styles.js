import { StyleSheet } from 'react-native';

// global
import { WorkSansRegular } from 'global/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  inputBox: {
    flex: 1,
    fontSize: 18,
    // lineHeight: 18,
    paddingVertical: 5,
    ...WorkSansRegular
  },
  crossIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    marginLeft: 20
  }
});
