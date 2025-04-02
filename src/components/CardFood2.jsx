import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/format';

const CardFood2 = ({ food, restaurant }) => {
  console.log(food, restaurant);
  const navigation = useNavigation();
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
          <Text style={styles.foodName}>{food.name}</Text>
        </View>
        <View style={styles.foodDesContainer}>
          <Text style={styles.foodDescription} numberOfLines={2}>
            {food.descriptions}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(food.price)}</Text>
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
    borderRadius: 10,
    elevation: 5,
    height: 100,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  mainContainer: {
    width: '70 %',
  },
  imageContainer: {
    marginRight: 10,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  foodNameContainer: {
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  foodDesContainer: {
    marginBottom: 10,
    width: '80%',
  },
  foodDescription: {
    fontSize: 13,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
  },
});
