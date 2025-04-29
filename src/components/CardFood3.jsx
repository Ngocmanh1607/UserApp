import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/format';
import restaurantApi from '../api/restaurantApi';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const FoodCard = ({ food, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <Image source={{ uri: food.image }} style={styles.foodImage} />
    <View style={styles.contentContainer}>
      <Text style={styles.foodName} numberOfLines={1}>
        {food.name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {food.descriptions}
      </Text>
      <Text style={styles.price}>{formatPrice(food.price)}</Text>
    </View>
  </TouchableOpacity>
);

const CardFood3 = ({ products, restaurantId }) => {
  const navigation = useNavigation();
  const address = useSelector((state) => state.currentLocation);

  const handlePress = async (food) => {
    try {
      const [restaurantInfo, distance] = await Promise.all([
        restaurantApi.getInfoRestaurants(food.restaurant_id),
        restaurantApi.getDistance(
          address.latitude,
          address.longitude,
          food.restaurant_id
        ),
      ]);

      if (restaurantInfo.success && distance.success) {
        const restaurant = {
          ...restaurantInfo.data,
          distance: parseFloat(distance.data),
        };
        navigation.navigate('RestaurantDetail', { restaurant });
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin nhà hàng');
    }
  };

  return (
    <FlatList
      data={products}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FoodCard food={item} onPress={() => handlePress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: CARD_WIDTH * 0.75,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default CardFood3;
