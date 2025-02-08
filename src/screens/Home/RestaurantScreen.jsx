import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardFood2 from '../../components/CardFood2';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurantApi from '../../api/restaurantApi';

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
            try {
                const data = await restaurantApi.getFoodsRestaurant(restaurantId);
                setRestaurantData(data);
                setFilteredData(data);
                setLoading(false);
            } catch (error) {
                console.log('Error searching restaurants:', error);
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
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Image source={{ uri: restaurant.image }} style={styles.imageContainer} />
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <Text style={styles.text}>{restaurant.name}</Text>
                    <View style={styles.bottomContainer}>
                        <View style={styles.ratingContainer}>
                            <MaterialIcons name="star" size={20} color="#FFA500" />
                            <Text style={styles.ratingText}>{restaurant.rating || 5}</Text>
                        </View>
                        <View style={styles.disContainer}>
                            <Text style={styles.textDis}>Khoảng cách: {(restaurant.distance || 0).toFixed(2)}Km</Text>
                        </View>
                        <TouchableOpacity>
                            <Feather name="heart" size={20} style={styles.heart} />
                        </TouchableOpacity>
                    </View>
                </View>

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
                <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('CartScreen', { restaurantId }) }}>
                    <SimpleLineIcons name="handbag" size={35} color='black' />
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 1,
        padding: 10,
        zIndex: 1,
    },
    headerContainer: {
        width: '95%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
        elevation: 3,
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: "#000",
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 16,
        color: '#000',
    },
    disContainer: {
        justifyContent: 'center',
    },
    textDis: {
        fontSize: 16,
        color: '#666',
    },
    heart: {
        justifyContent: 'flex-end',
        marginLeft: 20,
    },
    searchbox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
        margin: 10
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    mainInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        zIndex: 1,
        right: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    foodScrollView: {
        flex: 1,
        marginHorizontal: 10,
    },
});