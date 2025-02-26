import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, FlatList } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Headerbar from "../../components/Headerbar";
import CardSlider from "../../components/CardSlider";
import OfferSlider from "../../components/OfferSlider";
import Categories from "../../components/Categories";
import CardRestaurant from "../../components/CardRestaurant";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import restaurantApi from "../../api/restaurantApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/css/HomeStyle";
import Loading from "../../components/Loading";

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu để tải không
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const address = useSelector(state => state.currentLocation);
    useEffect(() => {
        console.log('load do address')
        if (address.address && address.address !== 'Đang lấy vị trí...') {
            fetchRestaurantData(1,false);
        }
    }, [address]);
    const fetchRestaurantData = async (pageNumber = 1, isLoadMore = false) => {
        if (!hasMore || loadingMore) return;

        if (!isLoadMore) setLoading(true);
        else setLoadingMore(true);

        try {
            const data = await restaurantApi.getAllRestaurant(address, pageNumber);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setRestaurants(prevRestaurants => 
                    isLoadMore ? [...prevRestaurants, ...data] : data
                );
                setFilteredRestaurants(prevRestaurants =>
                    isLoadMore ? [...prevRestaurants, ...data] : data
                );
                setPage(pageNumber);
            }
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu nhà hàng:", error);
        }
        finally{
            setLoading(false);
        setLoadingMore(false);
        }
    };

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
    const handleLoadMore =()=>{
        if (!isSearch) {
            fetchRestaurantData(page + 1, true);
        }
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headContainer}>
                <Headerbar />
            </View>
            {loading ? (<Loading/> ) : (
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
                    <FlatList
                    data={filteredRestaurants}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=><CardRestaurant restaurant={item}/>}
                    ListHeaderComponent={()=>(
                        <>
                        <OfferSlider />
                        <Categories />
                        <CardSlider />
                    </>
                )}
                ListFooterComponent={()=>loadingMore && <ActivityIndicator size='small' color="red"/>}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1} // Cuộn đến 20% cuối danh sách sẽ gọi API
                />
            </View>
                                )}
            <View style={styles.cartContainer}>
                <TouchableOpacity onPress={handelPress}>
                    <SimpleLineIcons name="handbag" size={35} color='black' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

