import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardFood2 from '../../components/CardFood2';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurantApi from '../../api/restaurantApi';
import styles from '../../assets/css/RestaurantStyle';
import ArrowBack from '../../components/ArrowBack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { HandleApiError } from '../../utils/handleError';
const RestaurantScreen = ({ route }) => {
    const navigation = useNavigation();
    const { restaurant } = route.params;
    const restaurantId = restaurant.id;
    const [loading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            setLoading(true);
            const data = await restaurantApi.getFoodsRestaurant(restaurantId);
            setLoading(false);
            if (data.success) {
                setRestaurantData(data.data);
                setFilteredData(data.data);
            }
            else {
                Alert.alert('Lỗi', data.message);
            }
        }
        fetchRestaurantData();
    }, [restaurantId]);
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredData(restaurantData);
        }
        else {
            const filtered = restaurantData.filter(food =>
                food.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredData(filtered);
        }
    }
    const handlePress = () => {
        navigation.navigate('ReviewScreen', { restaurantId });
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Image source={{ uri: restaurant.image }} style={styles.imageContainer} />
                <ArrowBack navigation={navigation} />
                <TouchableOpacity style={styles.heartContainer}>
                    <Feather name="heart" size={20} style={styles.heart} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerContainer} onPress={handlePress}>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.text}>{restaurant.name}</Text>
                        <View style={styles.bottomContainer}>
                            <View style={styles.ratingContainer}>
                                <MaterialIcons name="star" size={20} color="#FFA500" />
                                <Text style={styles.ratingText}>{restaurant.rating || 5}</Text>
                            </View>
                            <View style={styles.disContainer}>
                                <Text style={styles.textDis}>Khoảng cách: {(restaurant.distance || 0).toFixed(2)}Km</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="chevron-right" size={16} color={'#555'} />
                    </View>
                </TouchableOpacity>
                <View style={styles.mainInContainer}>
                    <View style={styles.searchbox}>
                        <TouchableOpacity>
                            <AntDesign name='search1' size={24} color="black" style={{ color: 'red', paddingRight: 10, marginLeft: 10 }} />
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder="Tìm kiếm món ăn"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                <ScrollView style={styles.foodScrollView}>
                    {filteredData.map(food => (
                        <CardFood2 key={food.id} food={food} restaurant={restaurant} />
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('CartScreen', { restaurantId: restaurantId }) }}>
                    <SimpleLineIcons name="handbag" size={35} color='black' />
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default RestaurantScreen;
