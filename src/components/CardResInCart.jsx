import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import formatPrice from '../utils/format';
import { useSelector } from 'react-redux';

const CardResInCart = ({ restaurant, restaurantId }) => {
  console.log(restaurant, restaurantId);
  const items = useSelector((state) => state.cart.carts[restaurantId]);
  console.log(items);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('CartScreen', { restaurantId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: restaurant.image }} style={styles.imageContainer} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.textFood}>{items.length} món</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 90,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 5,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  imageContainer: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  textAmount: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  textFood: {
    marginLeft: 20,
    fontSize: 14,
    color: '#000000',
  },
});

export default CardResInCart;
