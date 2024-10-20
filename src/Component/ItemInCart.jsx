import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import React, { useState } from 'react'

const ItemInCart = () => {
    // State to keep track of the quantity
    const [quantity, setQuantity] = useState(1);

    // Function to handle increment
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to handle decrement
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    return (
        <View style={styles.foodContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../Images/pop_2.png')}
                    style={styles.foodImage}
                />
            </View>
            <View style={styles.infContainer}>
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodName}>Pizza</Text>
                </View>
                <View style={styles.handleContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>20.000đ</Text>
                    </View>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleDecrement}>
                            <Feather name="minus" size={16} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{quantity}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleIncrement}>
                            <MaterialIcons name="add" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemInCart

const styles = StyleSheet.create({
    foodContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        elevation: 5,
        width: "95%",
        height: 120,
        margin: 10,
        alignItems: 'center',
        flex: 1,
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
        marginHorizontal: 10
    },
    foodNameContainer: {
        marginTop: 10
    },
    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    handleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        alignItems: 'center'
    },
    infContainer: {
        flex: 1,
        margin: 10
    },
    text: {
        fontSize: 18,
        color: '#000000',
        margin: 10
    }
})