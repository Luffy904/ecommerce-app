import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getProduct } from '../services/api';

const ProductDetailScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(productId);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!product) return <Text style={styles.error}>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
      <Text style={styles.description}>Description: {product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 200, height: 200, alignSelf: 'center', marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 16, marginBottom: 5 },
  quantity: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 14 },
  loading: { textAlign: 'center', marginTop: 20 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default ProductDetailScreen;