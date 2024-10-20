import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CardBottom from '../Component/CardBottom';

const FoodDetailScreen = () => {
    const [toppings, setToppings] = useState([
        { id: 1, name: 'Trân châu trắng', price: '6.000đ', selected: false },
        { id: 2, name: 'Hạt đác', price: '6.000đ', selected: false },
        { id: 3, name: 'Thạch phô mai cafe', price: '6.000đ', selected: false },
        { id: 4, name: 'Hạt chia', price: '6.000đ', selected: false },
        { id: 5, name: 'Sương sáo', price: '6.000đ', selected: false },
        { id: 6, name: 'Thạch trà xanh', price: '6.000đ', selected: false },
        { id: 7, name: 'Nha đam', price: '6.000đ', selected: false },
    ]);

    const toggleTopping = (id) => {
        setToppings(toppings.map(topping =>
            topping.id === id ? { ...topping, selected: !topping.selected } : topping
        ));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../Images/pizza.png')} style={styles.image} blurRadius={1} />
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textName}>Trà xoài đào vải</Text>
                    <Text style={styles.textPrice}>30.000 đ</Text>
                </View>

                <ScrollView style={styles.toppingContainer}>
                    <Text style={styles.toppingTitle}>Topping</Text>
                    {toppings.map(topping => (
                        <View key={topping.id} style={styles.toppingItem}>
                            <Text style={styles.toppingName}>{topping.name}</Text>
                            <Text style={styles.toppingPrice}>{topping.price}</Text>
                            <CheckBox
                                value={topping.selected}
                                onValueChange={() => toggleTopping(topping.id)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.cardBottom}>
                    <CardBottom />
                </View>
            </View>
        </View>
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
        height: '100%',
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
        fontSize: 22,
        fontWeight: '500',
        color: '#000000',
    },
    textPrice: {
        fontSize: 18,
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
        bottom: 40,
        backgroundColor: '#FFFFFF'
    }
});