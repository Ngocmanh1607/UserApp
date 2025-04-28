import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardResInCart = ({ restaurant, restaurantId, quantity }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CartScreen', { restaurantId });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {restaurant.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <Ionicons name="restaurant-outline" size={16} color="#FF4500" />
            <Text style={styles.quantity}>{quantity} món</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    height: 110,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: 90,
    height: 90,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 14,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  quantity: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '600',
    marginLeft: 4,
  },
  arrowContainer: {
    padding: 4,
  },
});

export default CardResInCart;
