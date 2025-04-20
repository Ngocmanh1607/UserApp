import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/format';
import restaurantApi from '../api/restaurantApi';
import { useSelector } from 'react-redux';
import getRatingReview from '../utils/getRatingReview';
const CardFood2 = ({ food }) => {
  const navigation = useNavigation();
  const address = useSelector((state) => state.currentLocation);
  const [restaurant, setRestaurant] = useState({});
  const handelPress = async () => {
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
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handelPress();
      }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.productImage }} style={styles.foodImage} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName}>{food.productName}</Text>
          <Text style={styles.foodDescription} numberOfLines={2}>
            {food.productDescription}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(food.productPrice)}</Text>
          <View style={styles.addButton}>
            <MaterialIcons name="add" size={16} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardFood2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 3,
    height: 110,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mainContainer: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    marginRight: 12,
  },
  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  foodNameContainer: {
    marginBottom: 6,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  foodDesContainer: {},
  foodDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  price: {
    fontSize: 18,
    color: '#FF4B3A',
    fontWeight: '800',
  },
  addButton: {
    backgroundColor: '#FF4B3A',
    borderRadius: 25,
    padding: 8,
    elevation: 2,
    shadowColor: '#FF4B3A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
