import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import formatPrice from '../utils/formatPrice';

const CardFood2 = ({ food }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate('FoodDetail', { food })
        }}>
            <View style={styles.imageContainer}>
                <Image
                    // source={{ uri: food.productImage }}
                    style={styles.foodImage}
                />
            </View>
            <View style={styles.mainContainer} >
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodName}>{food.productName}</Text>
                </View>
                <View style={styles.foodDesContainer}>
                    <Text style={styles.foodDescription} numberOfLines={2}>
                        {food.productDescription}
                    </Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(food.productPrice)}</Text>
                    <View style={styles.addButton}>
                        <MaterialIcons name="add" size={16} color="white" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardFood2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: 5,
        height: 120,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    mainContainer: {
        width: "70 %"
    },
    imageContainer: {
        marginRight: 10,
    },
    foodImage: {
        width: 90,
        height: 90,
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
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: '#FF0000',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        padding: 6,
    }
});