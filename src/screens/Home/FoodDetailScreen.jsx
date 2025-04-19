import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';

import { formatPrice } from '../../utils/format';
import { foodApi } from '../../api/foodApi';
import styles from '../../assets/css/FoodDetailStyle';
import { cart } from '../../api/cartOrder';
import { fetchCartCount } from '../../store/cartSlice';
const FoodDetailScreen = () => {
  const route = useRoute();
  const { food, restaurant } = route.params;
  const navigation = useNavigation();
  const [foodDetails, setFoodDetails] = useState({
    ...food,
    quantity: 1,
    price: food.is_flash_sale ? food.discountPrice : food.price,
  });
  const [sum, setSum] = useState(
    food.is_flash_sale ? food.discountPrice : food.price
  );
  const [toppings, setToppings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTopping = async () => {
      const data = await foodApi.getFoodTopping(food.id);
      if (data.success) {
        setToppings(data.data);
      } else {
        Alert.alert('Thông báo', data.message);
      }
    };
    fetchTopping();
  }, []);
  const handleIncrement = () => {
    setFoodDetails((prevDetails) => {
      const newQuantity = prevDetails.quantity + 1;
      calculateTotal(toppings, newQuantity);
      return {
        ...prevDetails,
        quantity: newQuantity,
      };
    });
  };

  const handleDecrement = () => {
    if (foodDetails.quantity > 1) {
      setFoodDetails((prevDetails) => {
        const newQuantity = prevDetails.quantity - 1;
        calculateTotal(toppings, newQuantity);
        return { ...prevDetails, quantity: newQuantity };
      });
    }
  };

  const toggleTopping = (id) => {
    setToppings((prevToppings) => {
      const updatedToppings = prevToppings.map((topping) =>
        topping.id === id
          ? { ...topping, selected: !topping.selected }
          : topping
      );
      calculateTotal(updatedToppings, foodDetails.quantity);
      return updatedToppings;
    });
  };

  const calculateTotal = (updatedToppings, quantity) => {
    const selectedToppingsPrice = updatedToppings
      .filter((topping) => topping.selected)
      .reduce((total, topping) => total + topping.price, 0);
    const basePrice = food.is_flash_sale ? food.discountPrice : food.price;
    const totalSum = (basePrice + selectedToppingsPrice) * quantity;
    setSum(totalSum);
  };
  const handleAddtoCart = async () => {
    try {
      const selectedToppings = toppings.filter((topping) => topping.selected);
      const selectedToppingsPrice = selectedToppings.reduce(
        (total, topping) => total + topping.price,
        0
      );
      const totalPrice = foodDetails.price + selectedToppingsPrice;
      const food = {
        ...foodDetails,
        price: totalPrice,
        toppings: selectedToppings,
        restaurant_id: restaurant.id,
      };
      const response = await cart.addItem(restaurant.id, food.id, food);
      if (response.success) {
        Snackbar.show({
          text: 'Thêm vào giỏ hàng thành công !',
          duration: Snackbar.LENGTH_SHORT,
        });

        // Gọi lại API để cập nhật số lượng giỏ hàng
        dispatch(fetchCartCount(restaurant.id));
        navigation.goBack();
      } else {
        Alert.alert('Đã có lỗi xảy ra', response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: food.image }} style={styles.image} blurRadius={1} />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textName}>{food.name}</Text>
          <View style={styles.priceContainer}>
            {food.is_flash_sale ? (
              <>
                <Text style={styles.originalPrice}>
                  {formatPrice(food.price)}
                </Text>
                <Text style={styles.discountPrice}>
                  {formatPrice(food.discountPrice)}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    -{Math.round((1 - food.discountPrice / food.price) * 100)}%
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.textPrice}>{formatPrice(food.price)}</Text>
            )}
          </View>
        </View>

        <FlatList
          style={styles.toppingContainer}
          data={toppings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.toppingItem}>
              <Text style={styles.toppingName}>{item.topping_name}</Text>
              <Text style={styles.toppingPrice}>{formatPrice(item.price)}</Text>
              <CheckBox
                style={styles.checkbox}
                value={item.selected}
                onValueChange={() => toggleTopping(item.id)}
              />
            </View>
          )}
        />

        <View style={styles.cardBottom}>
          <View style={styles.bottomContainer}>
            <View style={styles.mainBContainer}>
              <Text style={styles.text}>{formatPrice(sum)}</Text>
              <View style={styles.numberContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleDecrement}>
                  <Feather name="minus" size={16} color="white" />
                </TouchableOpacity>
                <Text style={styles.text}>{foodDetails.quantity}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleIncrement}>
                  <MaterialIcons name="add" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleAddtoCart}>
              <Text style={styles.textAdd}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetailScreen;
