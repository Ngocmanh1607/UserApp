import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CardBottom = () => {
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
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>30.000 đ</Text>
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
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.textAdd}> Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CardBottom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        margin: 20,
        flexDirection: 'column',
    },
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
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

})