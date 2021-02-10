import React, { useState, useEffect } from 'react';

// Expo
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// apis
// import { tokenCheck } from 'api';

// navigator
import Navigator from 'navigator';

// global
import Colors from 'global/colors';
import FontsList from 'global/fonts';

// assets
import WorkSansItalic from 'assets/fonts/WorkSans-Italic-Variable.ttf';
import WorkSansRegular from 'assets/fonts/WorkSans-Regular-Variable.ttf';

// utils
import UserInfo from 'utils/userInfo';

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

MapboxGL.setAccessToken(MAPBOX_API_KEY);

function App() {
  const [isReady, setIsReady] = useState(false);

  const customFonts = {};
  customFonts[FontsList.italic] = WorkSansItalic;
  customFonts[FontsList.regular] = WorkSansRegular;

  async function loadResources() {
    await UserInfo.init();

    await Fonts.loadAsync(customFonts);

    // const userToken = UserInfo.getToken();

    // try {
    //   if (userToken) {
    //     tokenCheck(userToken)
    //       .then(async response => {
    //         console.log('Token check response:', response);

    //         const newToken = response.data;

    //         await UserInfo.setNewToken(newToken);
    //       })
    //       .catch(async err => {
    //         console.log('Token check error:', error);

    //         await UserInfo.delete();
    //       });
    //   }
    // } catch {
    //   console.log('Token check catch');
    // }
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
    })();
  }, [setIsReady]);

  if (!isReady) return null;

  return (
    <PaperProvider theme={theme}>
      <Navigator />
      <StatusBar translucent={false} backgroundColor='#000000' />
    </PaperProvider>
  );
}

export default App;
