import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Headerbar from "../components/Headerbar";
import CardSlider from "../components/CardSlider";
import OfferSlider from "../components/OfferSlider";
import Categories from "../components/Categories";
import CardRestaurant from "../components/CardRestaurant";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import restaurantApi from "../api/restaurantApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../api/userApi";

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const address = useSelector(state => state.currentLocation);
    useEffect(() => {
        const fetchRestaurantData = async () => {
            setLoading(true);
            const data = await restaurantApi.getAllRestaurant(address);
            console.log(data)
            setRestaurants(data);
            setFilteredRestaurants(data);
            await userApi.getInfoUser(dispatch);
            setLoading(false);
        };

        if (address.address && address.address != 'Đang lấy vị trí...') {
            fetchRestaurantData();
        }
    }, [address]);
    const handleSearch = (query) => {
        setSearch(query);
        if (query.length > 0) {
            setIsSearch(true);
            const results = restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRestaurants(results);
        } else {
            setIsSearch(false);
            setFilteredRestaurants(restaurants);
        }
    };

    const handelPress = () => {
        navigation.navigate('CartResScreen');
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
                        <AntDesign name='search1' size={24} color="red" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm theo tên nhà hàng"
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>

                {/* Loading Indicator */}
                {loading ? (
                    <ActivityIndicator size="large" color="red" style={{ marginTop: 20 }} />
                ) : (
                    isSearch ? (
                        <ScrollView>
                            {filteredRestaurants.length > 0 ? (
                                filteredRestaurants.map((restaurant) => (
                                    <CardRestaurant key={restaurant.id} restaurant={restaurant} />
                                ))
                            ) : (
                                <Text style={styles.textErrol}>Không tìm thấy kết quả</Text>
                            )}
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            <OfferSlider />
                            <Categories />
                            <CardSlider />
                            {filteredRestaurants.length > 0 ? (
                                filteredRestaurants.map((restaurant) => (
                                    <CardRestaurant key={restaurant.id} restaurant={restaurant} />
                                ))
                            ) : (
                                <Text style={styles.textErrol}>Không có nhà hàng nào</Text>
                            )}
                        </ScrollView>
                    )
                )}
            </View>
            <View style={styles.cartContainer}>
                <TouchableOpacity onPress={handelPress}>
                    <SimpleLineIcons name="handbag" size={35} color='black' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headContainer: {
        marginHorizontal: 5,
    },
    searchbox: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10,
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
        marginBottom: 110,
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        zIndex: 1,
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#333'
    },
    textErrol: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 20
    }
});