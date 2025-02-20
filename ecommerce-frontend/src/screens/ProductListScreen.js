import React, { useEffect, useState, useContext } from 'react';
import { FlatList, View, Text, ActivityIndicator, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { getProducts } from '../services/api';
import ProductItem from '../components/ProductItem';

const ProductListScreen = ({ navigation }) => {
  const { roles, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

//   console.log('Current roles in ProductListScreen:', roles); // Debug log

  return (
    <View style={{ padding: 20 }}>
      <Button title="Logout" onPress={handleLogout} />
      {roles.includes('ROLE_EDIT') && (
        <Button
          title="Add Product"
          onPress={() => navigation.navigate('ProductAdd')}
          style={{ marginTop: 10 }}
        />
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductListScreen;