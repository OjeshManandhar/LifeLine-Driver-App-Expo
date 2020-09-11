import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Text,
  Button
} from 'react-native';

// styles
import styles from './styles';

// assets
import logo from 'assets/images/logo.png';
import topCurve from 'assets/images/login/top_curve.png';
import bottomCurve from 'assets/images/login/bottom_curve.png';

function Login({ navigation }) {
  const [password, setPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      {!inputFocus && <Image source={topCurve} style={styles.topCurve} />}

      <Image source={logo} style={styles.logo} />

      <TextInput
        style={styles.textBox}
        multiline={false}
        numberOfLines={1}
        keyboardType='phone-pad'
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onFocus={() => setInputFocus(true)}
        onEndEditing={() => setInputFocus(false)}
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
        onFocus={() => setInputFocus(true)}
        onEndEditing={() => setInputFocus(false)}
      />

      <Text style={styles.errorText}>Incorrect username or password</Text>

      <Button
        title='Login'
        onPress={() =>
          navigation.navigate('MapScreen', {
            userId: 'qwertyuiop'
          })
        }
      />

      {!inputFocus && <Image source={bottomCurve} style={styles.bottomCurve} />}
    </KeyboardAvoidingView>
  );
}

export default Login;
