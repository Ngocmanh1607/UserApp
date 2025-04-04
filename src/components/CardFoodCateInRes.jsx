import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/format';

const CardFoodCateInRes = ({ food, restaurant }) => {
  const navigation = useNavigation();
  console.log('food', food);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('FoodDetail', { food, restaurant });
      }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName} numberOfLines={1}>
            {food.product_name}
          </Text>
        </View>
        <View style={styles.foodDesContainer}>
          <Text style={styles.foodDescription} numberOfLines={2}>
            {food.product_description}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(food.product_price)}</Text>
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons name="add" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardFoodCateInRes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 4,
    height: 110,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  mainContainer: {
    flex: 1,
    paddingLeft: 12,
    height: '100%',
    justifyContent: 'space-between',
  },
  imageContainer: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  foodImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
  },
  foodNameContainer: {
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    paddingRight: 10,
  },
  foodDesContainer: {
    marginBottom: 6,
    width: '95%',
  },
  foodDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingRight: 5,
  },
  price: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    padding: 6,
    elevation: 2,
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
