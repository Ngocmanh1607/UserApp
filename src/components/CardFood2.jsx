import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

const CardFood2 = ({ food }) => {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('FoodDetail') }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/Images/pop_2.png')}
                        style={styles.foodImage}
                    />
                </View>
                <View >
                    <View style={styles.foodNameContainer}>
                        <Text style={styles.foodName}>{food.name}</Text>
                    </View>
                    <View style={styles.foodDesContainer}>
                        <Text style={styles.foodDescription}>
                            {food.description}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$ {food.price}</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <MaterialIcons name="add" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CardFood2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        elevation: 5,
        width: "95%",
        height: 120,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    foodImage: {
        width: 80,
        height: 80,
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'left',
    },
    foodDesContainer: {
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
        marginBottom: 10
    },
    imageContainer: {
        marginRight: 10
    },
    foodNameContainer: {
        marginTop: 10
    }
});