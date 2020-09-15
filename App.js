import React, { useState, useEffect } from 'react';

// Expo
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';

// packages
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator/Navigator';

// global
import FontsList from 'global/fonts';

// assets
import WorkSansItalic from 'assets/fonts/WorkSans-Italic-Variable.ttf';
import WorkSansRegular from 'assets/fonts/WorkSans-Regular-Variable.ttf';

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: FontsList.regular }
  }
};

function App() {
  const [isReady, setIsReady] = useState(false);

  const customFonts = {};
  customFonts[FontsList.italic] = WorkSansItalic;
  customFonts[FontsList.regular] = WorkSansRegular;

  async function loadResources() {
    await Fonts.loadAsync(customFonts);

    setIsReady(true);
  }

  if (isReady) {
    return (
      <PaperProvider theme={theme}>
        <Navigator />
        <StatusBar translucent={false} />
      </PaperProvider>
    );
  }

  return (
    <AppLoading
      startAsync={loadResources}
      onFinish={() => setIsReady(true)}
      onError={() => console.log('App Loading ERROR')}
      autoHideSplash={true}
    />
  );
}

export default App;
