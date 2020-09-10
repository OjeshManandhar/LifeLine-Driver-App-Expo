import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  BackHandler
} from 'react-native';

function MapScreen({ navigation, route }) {
  const routeParams = route.params;

  // Logout alert
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert('Log out?', 'Are you sure you want to Log out?', [
        { text: 'No', style: 'cancel', onPress: () => {} },
        {
          text: 'Yes',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action)
        }
      ]);
    });
  }, [navigation]);

  const handleBackButton = useCallback(() => {
    return true;
  }, []);

  // Handling the Hardware Back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map Screen</Text>
      <Text style={styles.text}>{JSON.stringify(routeParams)}</Text>
      <Text style={styles.text}>Env Var: {JSON.stringify(process.env)}</Text>
      <Button title='Log out' onPress={() => navigation.navigate('Login')} />
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
