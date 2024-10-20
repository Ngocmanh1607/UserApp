import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FoodCard = ({ food }) => {
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={20} color="#FFA500" />
                    <Text style={styles.ratingText}>{food.start}</Text>
                </View>
                <Image
                    source={require('../Images/pop_2.png')} // Replace with your image URL
                    style={styles.foodImage}
                />
                <Text style={styles.foodName}>{food.name}</Text>
                <View style={styles.foodDesContainer}>
                    <Text style={styles.foodDescription}>
                        {food.description}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>$ {food.price}</Text>
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
        width: 200,
        height: 250,
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
        fontSize: 20,
        color: '#FF0000',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        padding: 8,
    },
});