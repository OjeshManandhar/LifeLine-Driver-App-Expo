import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react';
import { View, Alert, Animated, Keyboard } from 'react-native';

// Expo
import * as SecureStore from 'expo-secure-store';

// packages
import { Button, TextInput } from 'react-native-paper';

// components
import Text from 'components/Text';

// context
import { UserTokenContext } from 'context/userToken';

// styles
import styles from './styles';

// global
import Colors from 'global/colors';
import { Login as LoginText } from 'global/strings';

// assets
import logo from 'assets/images/logo.png';
import topCurve from 'assets/images/login/top_curve.png';
import bottomCurve from 'assets/images/login/bottom_curve.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// env
import { USER_TOKEN_KEY } from '@env';

function Login({ navigation }) {
  const { userToken, setUserToken } = useContext(UserTokenContext);

  const LOGO_SIZE = 120;
  const TRANSLATATION_VALUE = 120;
  const ANIMATION_DURATION = 0.5 * 1000;

  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [errorText, setErrorText] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const flexValue = useRef(new Animated.Value(0)).current;
  const curveOpacityValue = useRef(new Animated.Value(1)).current;
  const topTranslateYValue = useRef(new Animated.Value(0)).current;
  const bottomTranslateYValue = useRef(new Animated.Value(0)).current;
  const logoSizeValue = useRef(new Animated.Value(LOGO_SIZE)).current;

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true);

    const checkPassword = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          console.log('sucess => connect to server');

          if (phoneNumber === '9863198269') {
            if (password === 'deadskull') {
              resolve({ userToken: 'userToken' });
            } else {
              reject({ errorCode: 'phonePassError' });
            }
          } else {
            reject({ errorCode: 'noAccount' });
          }
        } else {
          console.log('failure => no connection to server');

          reject({ errorCode: 'noNetwork' });
        }
      }, 2 * 1000);
    });

    checkPassword
      .then(async ({ userToken }) => {
        console.log('sucess userToken:', userToken);

        setUserToken(userToken);
        SecureStore.setItemAsync(USER_TOKEN_KEY, userToken);
      })
      .catch(({ errorCode }) => {
        setErrorText(LoginText.errorText[errorCode]);
        setIsLoggingIn(false);
      });

    /**
     * setIsLoggingIn(true);
     *
     * Send phoneNumber and password to server()
     *  .then({userToken} => {
     *    save userToken in SecureStore
     *    setUserToken(userToken);
     *  })
     *  .catch(error => {
     *    setErrorText(get errorText using error.code);
     *    setIsLoggingIn(false);
     *  })
     */
  }, [password, phoneNumber, setErrorText, setUserToken, setIsLoggingIn]);

  function showKeyboardAnim() {
    Animated.timing(flexValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false
    }).start();

    Animated.timing(logoSizeValue, {
      toValue: 0.75 * LOGO_SIZE,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();

    Animated.timing(curveOpacityValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(topTranslateYValue, {
      toValue: -TRANSLATATION_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(bottomTranslateYValue, {
      toValue: TRANSLATATION_VALUE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }

  function hideKeyboardAnim() {
    Animated.timing(flexValue, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    }).start();

    Animated.timing(logoSizeValue, {
      toValue: LOGO_SIZE,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();

    Animated.timing(curveOpacityValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(topTranslateYValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(bottomTranslateYValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }

  // Keyboard Animations
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', showKeyboardAnim);
    Keyboard.addListener('keyboardDidHide', hideKeyboardAnim);

    return () => {
      Keyboard.removeListener('keyboardDidShow', showKeyboardAnim);
      Keyboard.removeListener('keyboardDidHide', hideKeyboardAnim);
    };
  }, []);

  if (userToken) {
    navigation.navigate('MapScreen');
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={topCurve}
        style={[
          styles.topCurve,
          {
            opacity: curveOpacityValue,
            transform: [
              {
                translateY: topTranslateYValue
              }
            ]
          }
        ]}
      />

      <Animated.View
        style={[
          styles.formContainer,
          {
            flex: flexValue
          }
        ]}
      >
        <Animated.Image
          source={logo}
          style={[
            styles.logo,
            {
              width: logoSizeValue,
              height: logoSizeValue
            }
          ]}
        />

        <TextInput
          dense={true}
          mode='outlined'
          label={LoginText.loginForm.phoneNumber}
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          keyboardType='phone-pad'
          placeholder={LoginText.loginForm.phoneNumber}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          dense={true}
          mode='outlined'
          label={LoginText.loginForm.password}
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          autoCapitalize='none'
          placeholder={LoginText.loginForm.password}
          secureTextEntry={!showPassword}
          keyboardType={showPassword ? 'visible-password' : 'default'}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        <Button
          icon='login'
          mode='contained'
          color={Colors.primary}
          loading={isLoggingIn}
          disabled={
            phoneNumber &&
            phoneNumber.length === 10 &&
            password &&
            password.length >= 8
              ? false
              : true
          }
          style={[styles.loginButton, { marginTop: errorText ? 10 : 20 }]}
          contentStyle={styles.loginButtonContent}
          onPress={() => !isLoggingIn && handleLogin()}
        >
          <Text style={styles.loginButtonContent}>Login</Text>
        </Button>

        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(LoginText.signUp.title, LoginText.signUp.detail)
            }
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      <Animated.Image
        source={bottomCurve}
        style={[
          styles.bottomCurve,
          {
            opacity: curveOpacityValue,
            transform: [
              {
                translateY: bottomTranslateYValue
              }
            ]
          }
        ]}
      />
    </View>
  );
}

export default Login;
