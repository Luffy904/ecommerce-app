import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductAddScreen from '../screens/ProductAddScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, roles, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

//   console.log('Navigation roles:', roles); // Debug log

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      {roles.includes('ROLE_EDIT') && (
        <Stack.Screen name="ProductAdd" component={ProductAddScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;