import React, { useState } from 'react';

// Expo
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

// packages
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// context
import { Provider } from 'context/userToken';

// navigator
import Navigator from 'navigator/Navigator';

// dummy_api
import { checkToken } from 'dummy_api';

// global
import FontsList from 'global/fonts';

// assets
import WorkSansItalic from 'assets/fonts/WorkSans-Italic-Variable.ttf';
import WorkSansRegular from 'assets/fonts/WorkSans-Regular-Variable.ttf';

// env
import { USER_TOKEN_KEY } from '@env';

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: FontsList.regular }
  }
};

function App() {
  const [isReady, setIsReady] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const customFonts = {};
  customFonts[FontsList.italic] = WorkSansItalic;
  customFonts[FontsList.regular] = WorkSansRegular;

  async function loadResources() {
    await Fonts.loadAsync(customFonts);

    const userToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);

    if (userToken) {
      const { valid } = await checkToken(userToken);
      if (valid) {
        setUserToken(userToken);
      } else {
        await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
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
    <Provider value={{ userToken, setUserToken }}>
      <PaperProvider theme={theme}>
        <Navigator />
        <StatusBar translucent={false} />
      </PaperProvider>
    </Provider>
  );
}

export default App;
