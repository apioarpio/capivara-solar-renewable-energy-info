/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes/Routes';
import {TranslateProvider} from './context-providers/translate.context';

const App = () => {
  return (
    <NavigationContainer>
      <TranslateProvider>
        <Routes />
      </TranslateProvider>
    </NavigationContainer>
  );
};

export default App;
