import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Headerbar from "../components/Headerbar";
import CardSlider from "../components/CardSlider";
import OfferSlider from "../components/OfferSlider";
import Categories from "../components/Categories";
import FoodCard from "../components/CardFood";
import CardRestaurant from "../components/CardRestaurant";
import { SafeAreaView } from "react-native-safe-area-context";
import restaurantApi from "../api/restaurantApi";
import debounce from 'lodash.debounce'

const HomeScreen = () => {
    const [search, setSearch] = useState('')
    const [restaurants, setRestaurants] = useState([
        { name: 'Nhà hàng pizza', rating: 3.8, distance: 2, image: require("../assets/Images/pizza1.jpg") },
        { name: 'Nhà hàng burger', rating: 4.2, distance: 3, image: require("../assets/Images/pizza2.jpg") },
        { name: 'Nhà hàng sushi', rating: 4.5, distance: 1.5, image: require("../assets/Images/pizza3.jpg") }
    ]);
    const [isSearch, setIsSearch] = useState(false)
    // Hàm tìm kiếm nhà hàng
    const handleSearch = async (query) => {
        setSearch(query);
        if (query.length > 0) {
            setIsSearch(true);
            try {
                const data = await restaurantApi.searchRestaurants(query);
                setRestaurants(data); // Cập nhật danh sách nhà hàng
            } catch (error) {
                console.error('Error searching restaurants:', error);
                setRestaurants([]); // Reset danh sách nếu có lỗi
            }
        } else {
            setIsSearch(false);
            const data = await restaurantApi.getRestaurants(); // Refetch all restaurants if query is empty
            setRestaurants(data);
        }
    };

    // Sử dụng debounce để giảm tần suất gọi API
    const debouncedSearch = useCallback(debounce(handleSearch, 300), []) // 300ms delay

    const handleChangeText = (query) => {
        debouncedSearch(query);
    };

    const foodData = [
        {
            id: 1,
            name: "Chicken Burger",
            description: "100 gr chicken + tomato + cheese + Lettuce",
            price: "20.00",
            rating: "3.8",
            image: require('../assets/Images/pop_2.png'),
            start: 5,
        },
        {
            id: 2,
            name: "Beef Burger",
            description: "200 gr beef + lettuce + tomato + cheese",
            price: "25.00",
            rating: "4.2",
            image: require('../assets/Images/pop_2.png'),
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
                    <TextInput style={styles.input} placeholder="Tìm kiếm theo tên nhà hàng" value={search} onChangeText={handleChangeText} />
                </View>
                {
                    !isSearch ? (
                        <ScrollView>
                            {/* Sliders */}
                            < OfferSlider />
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
                        </ScrollView>)
                        : (
                            <ScrollView>
                                {restaurants.length > 0 ? (
                                    restaurants.map((restaurant, index) => (
                                        <CardRestaurant key={index} restaurant={restaurant} />
                                    ))
                                ) : (
                                    <Text>No results found</Text>
                                )}
                            </ScrollView>
                        )

                }
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
});