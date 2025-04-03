import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { formatPrice } from '../utils/format';
import { useNavigation } from '@react-navigation/native';

const ItemInCart = ({ food, onAdd }) => {
  const navigation = useNavigation();
  const toppingName = food.toppings?.map((item) => item.topping_name);

  const handleIncrement = () => {
    const newFood = { ...food, quantity: 1 };
    onAdd(food.id, newFood);
  };

  const handleDecrement = () => {
    if (food.quantity > 1) {
      const newFood = { ...food, quantity: -1 };
      onAdd(food.id, newFood);
    } else {
      Alert.alert('Xoá sản phẩm', 'Bạn muốn xoá sản phẩm này khỏi giỏ hàng?', [
        {
          text: 'Huỷ',
          onPress: () => console.log('Người dùng đã huỷ xoá'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            const newFood = { ...food, quantity: -1 };
            onAdd(food.id, newFood);
          },
          style: 'destructive',
        },
      ]);
    }
  };

  const handlePress = () => {
    navigation.navigate('FoodDetail');
  };

  return (
    <TouchableOpacity style={styles.foodContainer} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
      </View>
      <View style={styles.infContainer}>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
            {food.name}
          </Text>
        </View>
        <View style={styles.foodToppingContainer}>
          {toppingName?.map((topping_name, index) => (
            <Text key={index} style={styles.toppingText}>
              {topping_name}
            </Text>
          ))}
        </View>
        <View style={styles.handleContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(food.price)}</Text>
          </View>
          <View style={styles.numberContainer}>
            <TouchableOpacity
              style={styles.decrementButton}
              onPress={handleDecrement}>
              <Feather name="minus" size={14} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{food.quantity}</Text>
            <TouchableOpacity
              style={styles.incrementButton}
              onPress={handleIncrement}>
              <MaterialIcons name="add" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemInCart;

const styles = StyleSheet.create({
  foodContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    height: 110,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    paddingRight: 8,
  },
  foodImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'left',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '700',
  },
  decrementButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 6,
    elevation: 2,
  },
  incrementButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 6,
    elevation: 2,
  },
  imageContainer: {
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 2,
  },
  foodNameContainer: {
    marginTop: 8,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  handleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  infContainer: {
    flex: 1,
    marginVertical: 10,
    marginRight: 12,
  },
  quantityText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    marginHorizontal: 14,
    minWidth: 20,
    textAlign: 'center',
  },
  toppingText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 6,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  foodToppingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
});
