import React, { useEffect } from 'react';

// Expo
import * as Fonts from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

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
  const fontsList = {};
  fontsList[FontsList.italic] = WorkSansItalic;
  fontsList[FontsList.regular] = WorkSansRegular;

  const [fontsLoaded] = Fonts.useFonts(fontsList);

  // Prevent Auto hide of Splash Screen
  useEffect(() => {
    (async function () {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn('Splash Screen Error:', error);
      }
    })();
  }, []);

  // Hide Splash Screen
  useEffect(() => {
    if (fontsLoaded) {
      (async function () {
        await SplashScreen.hideAsync();
      })();
    }

    // Hide Splash Screen after 5 secs
    // setTimeout(async () => {
    //   console.log('Hide Splash Screen');
    //   await SplashScreen.hideAsync();
    // }, 5 * 1000);
  }, [fontsLoaded]);

  if (fontsLoaded) {
    return (
      <PaperProvider theme={theme}>
        <Navigator />
        <StatusBar translucent={false} />
      </PaperProvider>
    );
  }

  return null;
}

export default App;
