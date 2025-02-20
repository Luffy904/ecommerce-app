import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Use login from AuthContext

  const handleLogin = async () => {
    try {
      await login(username, password); // Call login from AuthContext
      setError(''); // Clear error on success
      navigation.navigate('ProductList'); // Navigate on success
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Server error';
      if (status === 401) {
        setError('Invalid credentials'); // Specific message for 401 Unauthorized
      } else {
        setError(`Login failed: ${message}`); // General error with server message
      }
      console.error('Login attempt failed:', { status, message });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;