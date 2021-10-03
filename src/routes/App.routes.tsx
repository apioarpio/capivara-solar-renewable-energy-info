import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IndexScreen from '../screen/src/IndexScreen';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Index'}
        component={IndexScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
