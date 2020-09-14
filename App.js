import React, { useEffect } from 'react';

// Expo
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// packages
import { Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator/Navigator';

function App() {
  useEffect(() => {
    async function preventAutoHideSplashScreen() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn('Splash Screen Error:', error);
      }
    }

    preventAutoHideSplashScreen();
  }, []);

  return (
    <PaperProvider>
      <Navigator />
      <StatusBar translucent={false} />
    </PaperProvider>
  );
}

export default App;
