import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Button, BackHandler } from 'react-native';

// components
import MapView from 'components/MapView';
import AccountView from 'components/AccountView';

// utils
import UserToken from 'utils/userToken';

// styles
import styles from './styles';

// global
import Routes from 'global/routes';
import { EMapScreenStatus } from 'global/enum';

function MapScreen({ navigation }) {
  const [mapScreenStatus, setMapScreenStatus] = useState(
    EMapScreenStatus.mapView
  );

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
          onPress: () => {
            console.log('Logout');
            UserToken.delete();
            navigation.dispatch(e.data.action);
          }
        }
      ]);
    });
  }, [navigation]);

  const handleBackButton = useCallback(() => {
    switch (mapScreenStatus) {
      case EMapScreenStatus.mapView:
        BackHandler.exitApp();
        break;
      case EMapScreenStatus.accountView:
        setMapScreenStatus(EMapScreenStatus.mapView);
        break;
    }
    return true;
  }, [mapScreenStatus, setMapScreenStatus]);

  // Handling the Hardware Back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  return (
    <View style={styles.container}>
      <MapView
        toAccount={() => setMapScreenStatus(EMapScreenStatus.accountView)}
      />

      <AccountView
        in={mapScreenStatus === EMapScreenStatus.accountView}
        logout={() => navigation.navigate(Routes.login)}
      />
    </View>
  );
}

export default MapScreen;
