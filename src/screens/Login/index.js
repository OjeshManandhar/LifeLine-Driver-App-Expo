import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Animated, Keyboard, TextInput } from 'react-native';

// packages
import { Button } from 'react-native-paper';

// styles
import styles from './styles';

// assets
import logo from 'assets/images/logo.png';
import topCurve from 'assets/images/login/top_curve.png';
import bottomCurve from 'assets/images/login/bottom_curve.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function Login({ navigation }) {
  const LOGO_SIZE = 125;
  const TRANSLATATION_VALUE = 120;
  const ANIMATION_DURATION = 0.5 * 1000;

  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const flexValue = useRef(new Animated.Value(0)).current;
  const curveOpacityValue = useRef(new Animated.Value(1)).current;
  const topTranslateYValue = useRef(new Animated.Value(0)).current;
  const bottomTranslateYValue = useRef(new Animated.Value(0)).current;
  const logoSizeValue = useRef(new Animated.Value(LOGO_SIZE)).current;

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
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          keyboardType='phone-pad'
          placeholder='Phone Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.textBox}
          multiline={false}
          numberOfLines={1}
          keyboardType='default'
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.errorText}>Incorrect username or password</Text>

        <Button
          icon='login'
          color='#ff3a3a'
          mode='contained'
          disabled={false}
          style={styles.loginButton}
          onPress={() => {
            console.log('Login');
            // navigation.navigate('MapScreen', {
            //   userId: 'qwertyuiop'
            // });
          }}
        >
          Login
        </Button>

        <View style={styles.signUpContainer}>
          <Text>Don't have an account? </Text>
          <TouchableWithoutFeedback onPress={() => console.log('Sign Up')}>
            <Text>Sign Up</Text>
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