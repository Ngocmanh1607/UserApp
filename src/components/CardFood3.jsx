import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import formatPrice from '../utils/formatPrice';
import restaurantApi from '../api/restaurantApi';
import { useSelector } from 'react-redux';

const CardFood3 = ({ food, id }) => {
    const address = useSelector(state => state.currentLocation);
    const [restaurant, setRestaurant] = useState({});
    const navigation = useNavigation();

    const handlePres = async () => {
        try {
            // Gọi cả hai API đồng thời
            const [restaurantInfo, distance] = await Promise.all([
                restaurantApi.getInfoRestaurants(id),
                restaurantApi.getDistance(address.latitude, address.longitude, id)
            ]);
            const dis = parseFloat(distance);
            const updatedRestaurant = { ...restaurantInfo, distance: dis };

            navigation.navigate('RestaurantDetail', { restaurant: updatedRestaurant });


            setRestaurant(updatedRestaurant);
        } catch (error) {
            console.error('Error fetching restaurant or distance:', error);
        }
    };
    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePres()}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: food.image }}
                    style={styles.foodImage}
                />
            </View>
            <View style={styles.mainContainer} >
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodName}>{food.name}</Text>
                </View>
                <View style={styles.foodDesContainer}>
                    <Text style={styles.foodDescription} numberOfLines={2}>
                        {food.descriptions}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(food.price)}</Text>
                    {/* <View style={styles.addButton}>
                        <MaterialIcons name="add" size={16} color="white" />
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardFood3;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        elevation: 10,
        width: 150,
        height: 200,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    mainContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    foodImage: {
        marginTop: 5,
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    foodNameContainer: {
        marginBottom: 4,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    foodDesContainer: {
        marginBottom: 10,
        width: '80%',
    },
    foodDescription: {
        fontSize: 13,
        color: '#666666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        color: '#FF0000',
        fontWeight: 'bold',
    },
});
