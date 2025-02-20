import React, { useEffect, useState } from 'react';
import {  Text, View, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import Snackbar from 'react-native-snackbar';
import formatPrice from '../../utils/formatPrice';
import { foodApi } from '../../api/foodApi';
import styles from '../../assets/css/FoodDetailStyle';

const FoodDetailScreen = () => {
    const route = useRoute();
    const { food, restaurant } = route.params;
    const navigation = useNavigation();
    const restaurantInfo = {
        name: restaurant.name,
        image: restaurant.image,
    };
    const dispatch = useDispatch();
    const [foodDetails, setFoodDetails] = useState({ ...food, quantity: 1 });
    const [sum, setSum] = useState(food.price);
    const [toppings, setToppings] = useState([]);
    useEffect(() => {
        const fetchTopping = async () => {
            try {
                const data = await foodApi.getFoodTopping(food.id);
                setToppings(data);
            } catch (error) {

            }
        }
        fetchTopping();
    }, [])
    const handleIncrement = () => {
        setFoodDetails(prevDetails => {
            const newQuantity = prevDetails.quantity + 1;
            calculateTotal(toppings, newQuantity);
            return { ...prevDetails, quantity: newQuantity };
        });
    };

    const handleDecrement = () => {
        if (foodDetails.quantity > 1) {
            setFoodDetails(prevDetails => {
                const newQuantity = prevDetails.quantity - 1;
                calculateTotal(toppings, newQuantity);
                return { ...prevDetails, quantity: newQuantity };
            });
        }
    };

    const toggleTopping = (id) => {
        setToppings(prevToppings => {
            const updatedToppings = prevToppings.map(topping =>
                topping.id === id ? { ...topping, selected: !topping.selected } : topping
            );
            calculateTotal(updatedToppings, foodDetails.quantity);
            return updatedToppings;
        });
    };

    const calculateTotal = (updatedToppings, quantity) => {
        const selectedToppingsPrice = updatedToppings
            .filter(topping => topping.selected)
            .reduce((total, topping) => total + topping.price, 0);
        const totalSum = (food.price + selectedToppingsPrice) * quantity;
        setSum(totalSum);
    };
    const handleAddtoCart = () => {
        try {
            const selectedToppings = toppings.filter(topping => topping.selected)
            const selectedToppingsPrice = selectedToppings.reduce((total, topping) => total + topping.price, 0);
            const totalPrice = food.price + selectedToppingsPrice;
            dispatch(addItem({ food: { ...foodDetails, price: totalPrice }, toppings: selectedToppings, restaurantInfo }))
            Snackbar.show(
                {
                    text: 'Thêm vào giỏ hàng thành công !',
                    duration: Snackbar.LENGTH_SHORT,
                }
            )
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: food.image }} style={styles.image} blurRadius={1} />
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textName}>{food.name}</Text>
                    <Text style={styles.textPrice}>{formatPrice(food.price)}</Text>
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
                                <TouchableOpacity style={styles.addButton} onPress={handleDecrement}>
                                    <Feather name="minus" size={16} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.text}>{foodDetails.quantity}</Text>
                                <TouchableOpacity style={styles.addButton} onPress={handleIncrement}>
                                    <MaterialIcons name="add" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleAddtoCart}>
                            <Text style={styles.textAdd}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default FoodDetailScreen;
