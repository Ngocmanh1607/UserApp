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
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: res.image }} style={styles.imageContainer} />
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{res.name}</Text>
          <Text style={styles.textSubTitle} numberOfLines={2}>
            {res.description}
          </Text>
          <View style={styles.bottomContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{res.rating}</Text>
              <MaterialIcons name="star" size={20} color="#FFA500" />
            </View>
            <View style={styles.distanceContainer}>
              <MaterialIcons name="place" size={18} color="#666" />
              <Text style={styles.distanceText}>
                {(restaurant.distance || 0).toFixed(2)} km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardRestaurant;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 100,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    flexDirection: 'row',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 12,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  textSubTitle: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
  },
  ratingText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distanceContainer: {
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});
