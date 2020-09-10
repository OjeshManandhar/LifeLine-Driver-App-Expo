import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <Button title='To Map' onPress={() => navigation.navigate('MapScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});

export default Login;
