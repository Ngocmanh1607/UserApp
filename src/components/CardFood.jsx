import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FoodCard = ({ food }) => {
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={require('../assets/Images/pop_2.png')}
                    style={styles.foodImage}
                />
                <Text style={styles.foodName}>{food.productName}</Text>
                <View style={styles.foodDesContainer}>
                    <Text style={styles.foodDescription}>
                        {food.productDescription}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{food.productPrice} đ</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <MaterialIcons name="add" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        elevation: 5,
        width: 180,
        height: 220,
        marginRight: 16,
        padding: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 16,
        color: '#000',
    },
    foodImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    foodDesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    foodDescription: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
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
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        padding: 8,
    },
});