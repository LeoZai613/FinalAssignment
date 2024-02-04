import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation';
import {AppContextProvider} from './contexts/AppContext';

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
