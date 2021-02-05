import React, { useState, useEffect } from 'react';

// Expo
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator';

// api
import { checkToken } from 'api';

// global
import Colors from 'global/colors';
import FontsList from 'global/fonts';

// assets
import WorkSansItalic from 'assets/fonts/WorkSans-Italic-Variable.ttf';
import WorkSansRegular from 'assets/fonts/WorkSans-Regular-Variable.ttf';

// utils
import UserToken from 'utils/userToken';
import UserLocation from 'utils/userLocation';

// env
import { MAPBOX_API_KEY } from '@env';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: FontsList.regular }
  }
};

UserLocation.init();
MapboxGL.setAccessToken(MAPBOX_API_KEY);

function App() {
  const [isReady, setIsReady] = useState(false);

  const customFonts = {};
  customFonts[FontsList.italic] = WorkSansItalic;
  customFonts[FontsList.regular] = WorkSansRegular;

  async function loadResources() {
    await UserToken.init();

    await Fonts.loadAsync(customFonts);

    const userToken = await UserToken.get();

    if (userToken) {
      checkToken(userToken)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      // const { valid } = await checkToken(userToken);
      // if (!valid) {
      //   await UserToken.delete();
      // }
    }
  }

  // Prevent Auto hide of Splash Screen
  useEffect(() => {
    (async function () {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn('Splash Screen Error:', error);
      }

      await loadResources();

      setIsReady(true);

      await SplashScreen.hideAsync();
    })();
  }, [setIsReady]);

  if (!isReady) return null;

  return (
    <PaperProvider theme={theme}>
      <Navigator />
      <StatusBar translucent={false} />
    </PaperProvider>
  );
}

export default App;
