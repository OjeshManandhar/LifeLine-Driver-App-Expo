import React from 'react';

// packages
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import MapScreen from './../screens/MapScreen';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='MapScreen' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
