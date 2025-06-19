import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Dashboard from './screens/DashBoard';
import { initializeAdmin } from './utils/storage';

const Stack = createNativeStackNavigator();

const MainApp = () => {
  useEffect(() => {
    initializeAdmin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;