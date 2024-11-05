import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
    ]);
    const [isSearch, setIsSearch] = useState(false)
    useEffect(() => {
        const fetchRestaurantData = async () => {
            const data = await restaurantApi.getAllRestaurant();
            const filterData = data.map(restaurant => ({
                id: restaurant.id,
                name: restaurant.name,
                image: restaurant.image,
                address: restaurant.address,
                rating: restaurant.rating,
                description: restaurant.description,
            }))
            setRestaurants(filterData);
        };
        fetchRestaurantData();
    }, [])
    const handleSearch = async (query) => {
        setSearch(query);
        if (query.length > 0) {
            setIsSearch(true);
            try {
                const data = await restaurantApi.searchRestaurants(query);
                setRestaurants(data);
            } catch (error) {
                console.error('Error searching restaurants:', error);
                setRestaurants([]);
            }
        } else {
            setIsSearch(false);
            const data = await restaurantApi.getRestaurants(); // Refetch all restaurants if query is empty
            setRestaurants(data);
        }
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 300), []) // 300ms delay

    const handleChangeText = (query) => {
        debouncedSearch(query);
    };



    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headContainer}>
                <Headerbar />
            </View>
            <View style={styles.scrollContainer}>
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
                            <Categories />
                            <OfferSlider />
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
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headContainer: {
        marginHorizontal: 5
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
    scrollContainer: {
        marginBottom: 100
    }
});