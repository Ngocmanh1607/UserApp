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
    <TouchableOpacity style={styles.foodContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
      </View>
      <View style={styles.infContainer}>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName}>{food.name}</Text>
        </View>
        <View style={styles.foodToppingContainer}>
          {toppingName?.map((topping_name) => {
            return <Text style={styles.toppingText}>{topping_name} </Text>;
          })}
        </View>
        <View style={styles.handleContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(food.price)}</Text>
          </View>
          <View style={styles.numberContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleDecrement}>
              <Feather name="minus" size={14} color="white" />
            </TouchableOpacity>
            <Text style={styles.text}>{food.quantity}</Text>
            <TouchableOpacity
              style={styles.addButton}
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
    borderRadius: 10,
    elevation: 3,
    height: 100,
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
  addButton: {
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
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  foodNameContainer: {
    marginTop: 8,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
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
  text: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    marginHorizontal: 12,
  },
  toppingText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 4,
  },
  foodToppingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
