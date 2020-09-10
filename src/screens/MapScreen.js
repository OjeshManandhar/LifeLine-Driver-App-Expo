import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map Screen</Text>
      <Button title='To Login' onPress={() => console.log('To Login')} />
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

export default MapScreen;
