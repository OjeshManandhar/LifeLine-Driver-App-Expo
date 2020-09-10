import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function MapScreen({ navigation, route }) {
  const routeParams = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map Screen</Text>
      <Text style={styles.text}>{JSON.stringify(routeParams)}</Text>
      <Button title='To Login' onPress={() => navigation.navigate('Login')} />
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
    fontSize: 18,
    textAlign: 'center'
  }
});

export default MapScreen;
