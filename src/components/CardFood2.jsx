import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/format';

const CardFood2 = React.memo(({ food, restaurant }) => {
  const navigation = useNavigation();
  console.log(food);

  const isFlashSale = food.is_flash_sale || false;

  return (
    <TouchableOpacity
      style={[styles.container, isFlashSale && styles.flashSaleContainer]}
      onPress={() => {
        navigation.navigate('FoodDetail', { food, restaurant });
      }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        {isFlashSale && (
          <View style={styles.flashSaleBadge}>
            <MaterialIcons name="flash-on" size={14} color="#FFF" />
            <Text style={styles.flashSaleText}>Flash Sale</Text>
          </View>
        )}
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.foodNameContainer}>
          <Text style={styles.foodName} numberOfLines={1}>
            {food.name}
          </Text>
        </View>
        <View style={styles.foodDesContainer}>
          <Text style={styles.foodDescription} numberOfLines={2}>
            {food.descriptions}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          {isFlashSale ? (
            <View style={styles.flashSalePriceContainer}>
              <Text style={styles.discountPrice}>
                {formatPrice(food.discountPrice)}
              </Text>
              <Text style={styles.originalPrice}>
                {formatPrice(food.price)}
              </Text>
            </View>
          ) : (
            <Text style={styles.price}>{formatPrice(food.price)}</Text>
          )}
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons name="add" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default CardFood2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  },
  mainContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  imageContainer: {
    elevation: 3,
    backgroundColor: '#fff',
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
  flashSaleContainer: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  flashSaleBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashSaleText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  flashSalePriceContainer: {
    flexDirection: 'column',
  },
  discountPrice: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
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
