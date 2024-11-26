import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import Snackbar from 'react-native-snackbar';
import formatPrice from '../utils/formatPrice';
import userApi from '../api/userApi';
import { foodApi } from '../api/foodApi';

const FoodDetailScreen = () => {
    const route = useRoute();
    const { food, restaurant } = route.params;
    const navigation = useNavigation();
    const restaurantInfo = {
        name: restaurant.name,
        image: restaurant.image
    };
    const dispatch = useDispatch();
    const [foodDetails, setFoodDetails] = useState({ ...food, quantity: 1 });
    const [sum, setSum] = useState(food.price);
    const [toppings, setToppings] = useState([]);
    useEffect(() => {
        const fetchTopping = async () => {
            try {
                const data = await foodApi.getFoodTopping(food.id)
                setToppings(data)
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
                    duration: Snackbar.LENGTH_SHORT
                }
            )
            navigation.goBack();
        } catch (error) {
            console.log(error)
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: '30%',
    },
    mainContainer: {
        position: 'absolute',
        zIndex: 1,
        width: '95%',
        height: '90%',
        top: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    textName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
    },
    textPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    toppingContainer: {
        margin: 20,
    },
    toppingTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    toppingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    toppingName: {
        fontSize: 16,
        flex: 1,
        color: '#000000',
    },
    toppingPrice: {
        fontSize: 16,
        marginRight: 10,
        color: '#000000',
    },
    cardBottom: {
        flex: 1,
        width: '100%',
        height: "30%",
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#FFFFFF'
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 1,
        padding: 10,
        zIndex: 1,
    },
    bottomContainer: {
        flex: 1,
        width: '100%',
        margin: 20,
        flexDirection: 'column',
    },
    mainBContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10
    },
    buttonContainer: {
        backgroundColor: "#FF0000",
        width: '80%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: 10
    },
    textAdd: {
        color: '#FFFFFF',
        fontSize: 18
    },
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        padding: 8,
        margin: 10
    },
    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000'
    },
});