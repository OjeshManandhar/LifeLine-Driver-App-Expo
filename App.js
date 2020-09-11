import React from 'react';
import { StatusBar } from 'expo-status-bar';

// navigator
import Navigator from 'navigator/Navigator';

function App() {
  return (
    <React.Fragment>
      <Navigator />
      <StatusBar translucent={false} />
    </React.Fragment>
  );
}

export default App;
