import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import React, { useEffect, useState } from 'react'
import formatPrice from '../utils/formatPrice'
import { useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../store/cartSlice'
import { useNavigation } from '@react-navigation/native'

const ItemInCart = ({ food, restaurantId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toppingName = food.toppings.map((item) => item.name)
    const [quantity, setQuantity] = useState(food.quantity);
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    useEffect(() => {
        dispatch(updateQuantity({ restaurantId: restaurantId, uniqueId: food.uniqueId, quantity: quantity }));
    }, [quantity]);
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
        else {
            Alert.alert(
                "Xoá sản phẩm",
                "Bạn muốn xoá sản phẩm này khỏi giỏ hàng?",
                [
                    {
                        text: "Huỷ",
                        onPress: () => console.log("Người dùng đã huỷ xoá"),
                        style: "cancel"
                    },
                    {
                        text: "Đồng ý",
                        onPress: () => {
                            dispatch(removeItem({ restaurantId: restaurantId, uniqueId: food.uniqueId }))
                        },
                        style: "destructive"
                    }
                ]
            );
        }
    };
    const handlePress = () => {
        navigation.navigate('FoodDetail',)
    }
    return (
        <TouchableOpacity style={styles.foodContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: food.image }}
                    style={styles.foodImage}
                />
            </View>
            <View style={styles.infContainer}>
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodName}>{food.name}</Text>
                </View>
                <View style={styles.foodToppingContainer}>
                    {toppingName.map((name) => {
                        return <Text style={{ fontSize: 12 }}>{name} </Text>
                    })}
                </View>
                <View style={styles.handleContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{formatPrice(food.price)}</Text>
                    </View>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleDecrement}>
                            <Feather name="minus" size={14} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{quantity}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleIncrement}>
                            <MaterialIcons name="add" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
        margin: 5,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1
    },
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    foodName: {
        fontSize: 16,
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
        fontSize: 16,
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