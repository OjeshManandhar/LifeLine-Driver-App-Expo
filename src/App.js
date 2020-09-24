import React, { useState } from 'react';

// Expo
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';

// packages
import MapboxGL from '@react-native-mapbox-gl/maps';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator/Navigator';

// dummy_api
import { checkToken } from 'dummy_api';

// global
import FontsList from 'global/fonts';

// assets
import WorkSansItalic from 'assets/fonts/WorkSans-Italic-Variable.ttf';
import WorkSansRegular from 'assets/fonts/WorkSans-Regular-Variable.ttf';

// utils
import UserToken from 'utils/userToken';

// env
import { MAPBOX_API_KEY } from '@env';

const theme = {
  ...DefaultTheme,
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
    await UserToken.init();

    await Fonts.loadAsync(customFonts);

    const userToken = await UserToken.get();

    if (userToken) {
      const { valid } = await checkToken(userToken, true);
      if (!valid) {
        await UserToken.delete();
      }
    }
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={() => setIsReady(true)}
        onError={() => console.log('App Loading ERROR')}
        autoHideSplash={true}
      />
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Navigator />
      <StatusBar translucent={false} />
    </PaperProvider>
  );
}

export default App;
