import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../utils/format';
import restaurantApi from '../api/restaurantApi';
import { useSelector } from 'react-redux';
const FlashSaleCard = ({ item }) => {
  const navigation = useNavigation();

  const discountPercent = Math.round(
    ((item.original_price - item.flash_sale_price) / item.original_price) * 100
  );
  const address = useSelector((state) => state.currentLocation);
  const [restaurant, setRestaurant] = useState({});
  const handlePress = async () => {
    // Gọi cả hai API đồng thời
    const [restaurantInfo, distance, ratingReview] = await Promise.all([
      restaurantApi.getInfoRestaurants(food.restaurantId),
      restaurantApi.getDistance(
        address.latitude,
        address.longitude,
        food.restaurantId
      ),
      getRatingReview(food.restaurantId),
    ]);
    if (restaurantInfo.success && distance.success) {
      const dis = parseFloat(distance.data);
      const updatedRestaurant = {
        ...restaurantInfo.data,
        distance: dis,
        rating: ratingReview,
      };
      navigation.navigate('RestaurantDetail', {
        restaurant: updatedRestaurant,
      });
      setRestaurant(updatedRestaurant);
    } else {
      Alert.alert('Lỗi', 'Không thể lấy thông tin nhà hàng');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.product_image }} style={styles.image} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{discountPercent}%</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {item.product_name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.product_description}
        </Text>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.flashPrice}>
              {formatPrice(item.flash_sale_price)}
            </Text>
            <Text style={styles.originalPrice}>
              {formatPrice(item.original_price)}
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 12,
    width: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
    height: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  flashPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#FF3B30',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlashSaleCard;
