import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import getRatingReview from '../utils/getRatingReview';

const CardRestaurant = ({ restaurant }) => {
  const [res, setRes] = useState(restaurant);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RestaurantDetail', { restaurant: res });
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const ratingReview = await getRatingReview(res.id);
        setRes({ ...restaurant, rating: ratingReview });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchReview();
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: res.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {res.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {res.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.rating}>
            <Text style={styles.ratingValue}>{res.rating}</Text>
            <MaterialIcons name="star" size={18} color="#FFA500" />
          </View>
          <View style={styles.distance}>
            <MaterialIcons name="place" size={16} color="#666" />
            <Text style={styles.distanceValue}>
              {(restaurant.distance || 0).toFixed(2)} km
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRestaurant;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    height: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    margin: 10,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  ratingValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  distanceValue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 3,
  },
});
