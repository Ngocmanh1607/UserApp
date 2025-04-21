import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import CardResInCart from '../../components/CardResInCart';
import { cart } from '../../api/cartOrder';
import { useNavigation } from '@react-navigation/native';

const CartResScreen = () => {
  const [loading, setLoading] = useState();
  const [carts, setCarts] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      const cartData = await cart.getAllCart();
      setLoading(false);
      if (cartData.success) {
        setCarts(cartData.data.metadata);
      } else {
        if (cartData.message == 'JsonWebTokenError: invalid signature') {
          Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            },
          });
        } else {
          Alert.alert('Đã xảy ra lỗi', cartData.message);
        }
      }
    };
    fetchCartData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => `${item.restaurant_id + index}`}
        data={carts}
        renderItem={({ item }) => (
          <CardResInCart
            restaurant={item.restaurant}
            restaurantId={item.restaurant_id}
            quantity={item.total_quantity}
          />
        )}
      />
    </View>
  );
};

export default CartResScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
});
