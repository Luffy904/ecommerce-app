import React, { useState, useContext, useCallback } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { addProduct } from '../services/api';

console.log("fgcfghfghfgh");

const ProductAddScreen = ({ navigation }) => {
  const { roles } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the change handler to prevent unnecessary re-renders
  const handleInputChange = useCallback((field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  }, []);

  // Memoize submit handler
  const handleSubmit = useCallback(async () => {
    if (!roles?.includes('ROLE_EDIT')) {
      Alert.alert('Permission Denied', 'You need the EDIT role to add products.');
      return;
    }

    // Basic validation to prevent empty submissions
    if (!product.name || !product.price || !product.quantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const newProduct = {
        name: product.name.trim(),
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity, 10),
        imageUrl: product.imageUrl.trim(),
        description: product.description.trim(),
      };

      if (isNaN(newProduct.price) || isNaN(newProduct.quantity)) {
        throw new Error('Invalid number format');
      }

      await addProduct(newProduct);
      Alert.alert('Success', 'Product added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', `Failed to add product: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [product, roles, navigation]);

  debugger;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={product.name}
        onChangeText={(text) => handleInputChange('name', text)}
        editable={!isLoading}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={product.price}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType="decimal-pad"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={product.quantity}
        onChangeText={(text) => handleInputChange('quantity', text)}
        keyboardType="number-pad"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={product.imageUrl}
        onChangeText={(text) => handleInputChange('imageUrl', text)}
        editable={!isLoading}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={product.description}
        onChangeText={(text) => handleInputChange('description', text)}
        editable={!isLoading}
        multiline
        numberOfLines={3}
      />
      <Button
        title={isLoading ? 'Adding...' : 'Add Product'}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProductAddScreen;