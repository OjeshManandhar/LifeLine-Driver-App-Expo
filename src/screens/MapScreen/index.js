import React, { useEffect, useCallback } from 'react';
import { View, Text, Alert, Button, BackHandler } from 'react-native';

// components
import Map from 'components/Map';

// utils
import UserToken from 'utils/userToken';

// styles
import styles from './styles';

// global
import Routes from 'global/routes';

// env
import { MAPBOX_API_KEY } from '@env';

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
          onPress: async () => {
            await UserToken.delete();
            navigation.dispatch(e.data.action);
          }
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
      <Map />
    </View>
  );
}

export default MapScreen;
