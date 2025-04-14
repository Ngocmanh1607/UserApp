import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CardResInCart = ({ restaurant, restaurantId, quantity }) => {
  console.log(restaurant, restaurantId);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CartScreen', { restaurantId });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {restaurant.description}
        </Text>
        <Text style={styles.quantity}>{quantity} món</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    height: 100,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  quantity: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
});

export default CardResInCart;
