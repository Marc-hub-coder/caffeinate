import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/CartContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../components/types';

const CheckoutScreen = () => {
  type NavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout Successful', 'Your order has been placed!', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        },
      },
    ]);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>No items in cart</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>₱{item.price * item.quantity} ({item.quantity} pcs)</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6f4e37',
    textAlign: 'center',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#4e342e',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#6f4e37',
  },
  checkoutButton: {
    backgroundColor: '#d2691e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4e342e',
    marginTop: 20,
  },
});

export default CheckoutScreen;