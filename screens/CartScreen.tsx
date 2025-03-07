import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/CartContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/types';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const { cart, updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>₱{item.price * item.quantity} ({item.quantity} pcs)</Text>
              <View style={styles.buttons}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.size, 'increase')}>
              <Ionicons name="add-circle" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.size, 'decrease')}>
              <Ionicons name="remove-circle" size={24} color="white" />
              </TouchableOpacity>

              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity 
        style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]} 
        onPress={() => navigation.navigate('Checkout')} 
        disabled={cart.length === 0}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e1c8',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6f4e37',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6f4e37',
    marginTop: 50,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    color: '#4e342e',
  },
  itemPrice: {
    fontSize: 16,
    color: '#6f4e37',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#8b4513',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  checkoutButton: {
    backgroundColor: '#d2691e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: '#b0a3a3',
  },
});

export default CartScreen;
