import React from 'react';
import { StatusBar } from 'expo-status-bar';

// packages
import { Provider as PaperProvider } from 'react-native-paper';

// navigator
import Navigator from 'navigator/Navigator';

function App() {
  return (
    <PaperProvider>
      <Navigator />
      <StatusBar translucent={false} />
    </PaperProvider>
  );
}

export default App;
