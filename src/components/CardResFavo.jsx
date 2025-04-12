import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import getRatingReview from '../utils/getRatingReview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardResFavo = ({ restaurant }) => {
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
      <View>
        <Image source={{ uri: restaurant.image }} style={styles.cardimage} />
      </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>{res.name}</Text>

        <View style={styles.cardin2}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.cardin2txt1} numberOfLines={1}>
              {res.description}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFA500" />
            <Text style={styles.cardin2txt1}>{res.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardResFavo;

const styles = StyleSheet.create({
  cardimage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  card: {
    width: 260,
    height: 180,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 8,
  },
  cardin1: {
    padding: 8,
  },
  cardin1txt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardin2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardin2txt1: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    paddingRight: 8,
  },
  descriptionContainer: {
    width: '85%',
  },
});
