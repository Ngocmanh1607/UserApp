import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Headerbar from "../Component/Headerbar";
import CardSlider from "../Component/CardSlider";
import OfferSlider from "../Component/OfferSlider";
import Categories from "../Component/Categories";
import FoodCard from "../Component/CardFood";
import CardRestaurant from "../Component/CardRestaurant";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const [search, setSearch] = useState('')
    const restaurants = [
        { name: 'Nhà hàng pizza', rating: 3.8, distance: 2, image: require("../Images/pizza1.jpg") },
        { name: 'Nhà hàng burger', rating: 4.2, distance: 3, image: require("../Images/pizza2.jpg") },
        { name: 'Nhà hàng sushi', rating: 4.5, distance: 1.5, image: require("../Images/pizza3.jpg") },
    ];

    const foodData = [
        {
            id: 1,
            name: "Chicken Burger",
            description: "100 gr chicken + tomato + cheese + Lettuce",
            price: "20.00",
            rating: "3.8",
            image: require('../Images/pop_2.png'),
            start: 5,
        },
        {
            id: 2,
            name: "Beef Burger",
            description: "200 gr beef + lettuce + tomato + cheese",
            price: "25.00",
            rating: "4.2",
            image: require('../Images/pop_2.png'),
            start: 3.5
        },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Headerbar />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Search box */}
                <View style={styles.searchbox}>
                    <TouchableOpacity>
                        <AntDesign name='search1' size={24} color="black" style={{ color: 'red', marginRight: 10 }} />
                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder="Tìm kiếm theo tên nhà hàng" value={search} onChangeText={setSearch} />
                </View>
                {/* Sliders */}
                <OfferSlider />
                <Categories />

                {/* Food cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodScrollView}>
                    {foodData.map(food => (
                        <FoodCard key={food.id} food={food} />
                    ))}
                </ScrollView>

                <CardSlider />

                {/* Restaurant cards */}
                {restaurants.map((restaurant, index) => (
                    <CardRestaurant key={index} restaurant={restaurant} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 5,
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 10,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
    },
    input: {
        width: '85%',
        fontSize: 16,
        color: 'black',
    },
    searchIcon: {

    },
    foodScrollView: {
    },
});