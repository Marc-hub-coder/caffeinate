import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/CartContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/types';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: 1, name: 'Iced Caramel Macchiato', image: require('../assets/caramel.jpg'), price16oz: 100, price22oz: 130 },
  { id: 2, name: 'Iced Spanish Latte', image: require('../assets/spanish.jpg'), price16oz: 110, price22oz: 140 },
  { id: 3, name: 'Iced Matcha Latte', image: require('../assets/matcha.jpg'), price16oz: 100, price22oz: 130 },
  { id: 4, name: 'Iced White Mocha', image: require('../assets/mocha.jpg'), price16oz: 105, price22oz: 135 },
  { id: 5, name: 'Iced Americano', image: require('../assets/americano.jpg'), price16oz: 80, price22oz: 100 },
  { id: 6, name: 'Flat White', image: require('../assets/flat white.jpg'), price16oz: 100, price22oz: 120 },
  { id: 7, name: 'Cafénate special', image: require('../assets/special.jpg'), price16oz: 150, price22oz: 180 },
  { id: 8, name: 'Special Kohi', image: require('../assets/kohi.jpg'), price16oz: 130, price22oz: 160 },
];

const HomeScreen = () => {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const addToCartWithSize = (size: '16oz' | '22oz') => {
    if (selectedProduct) {
      const price = size === '16oz' ? selectedProduct.price16oz : selectedProduct.price22oz;
      const uniqueId = selectedProduct.id * 100 + (size === '16oz' ? 1 : 2);
      addToCart({ id: uniqueId, name: `${selectedProduct.name} (${size})`, price, quantity: 1, size });
      setModalVisible(false);
      setSelectedProduct(null);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cafénate brewery</Text>
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <Ionicons name="cart" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
      
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Size for {selectedProduct?.name}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => addToCartWithSize('16oz')}>
              <Text style={styles.modalButtonText}>16oz - ₱{selectedProduct?.price16oz}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => addToCartWithSize('22oz')}>
              <Text style={styles.modalButtonText}>22oz - ₱{selectedProduct?.price22oz}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1c8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6f4e37',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    flex: 1,
    color: '#4e342e',
  },
  addButton: {
    backgroundColor: '#8b4513',
    padding: 10,
    borderRadius: 5,
  },
  cartButton: {
    backgroundColor: '#d2691e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#8b4513',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalCancelButton: {
    marginTop: 10,
    padding: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#8b4513',
  },
});

export default HomeScreen;
