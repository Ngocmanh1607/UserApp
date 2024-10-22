import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardFood2 from '../components/CardFood2';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import restaurantApi from '../api/restaurantApi';

const RestaurantScreen = ({ route }) => {
    const navigation = useNavigation();
    const { restaurant } = route.params;
    const restaurantId = restaurant.restaurantId
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const categories = [
        { label: 'All', value: 'all' },
        { label: 'Burgers', value: 'burgers' },
        { label: 'Pizza', value: 'pizza' },
        { label: 'Drinks', value: 'drinks' },
    ];
    const [restaurantData, setRestaurantData] = useState([{
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
        start: 3.5,
    },
    {
        id: 3,
        name: "Beef Burger",
        description: "200 gr beef + lettuce + tomato + cheese",
        price: "25.00",
        rating: "4.2",
        image: require('../assets/Images/pop_2.png'),
        start: 3.5,
    },
    {
        id: 4,
        name: "Beef Burger",
        description: "200 gr beef + lettuce + tomato + cheese",
        price: "25.00",
        rating: "4.2",
        image: require('../assets/Images/pop_2.png'),
        start: 3.5,
    },
    {
        id: 5,
        name: "Beef Burger",
        description: "200 gr beef + lettuce + tomato + cheese",
        price: "25.00",
        rating: "4.2",
        image: require('../assets/Images/pop_2.png'),
        start: 3.5,
    }])
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const data = await restaurantApi.getFoodsRestaurant(restaurantId);
                setRestaurantData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error searching restaurants:', error);
            }
        }
        fetchRestaurantData();
    }, [restaurantId])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Image source={restaurant.image} style={styles.imageContainer} />
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <Text style={styles.text}>{restaurant.name}</Text>
                    <View style={styles.bottomContainer}>
                        <View style={styles.ratingContainer}>
                            <MaterialIcons name="star" size={20} color="#FFA500" />
                            <Text style={styles.ratingText}>{restaurant.rating}</Text>
                        </View>
                        <View style={styles.disContainer}>
                            <Text style={styles.textDis}>Khoảng cách: {restaurant.distance}Km</Text>
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
                        <TextInput style={styles.input} placeholder="Tìm kiếm món ăn" />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            style={styles.picker}
                        >
                            {categories.map(category => (
                                <Picker.Item label={category.label} value={category.value} key={category.value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <ScrollView style={styles.foodScrollView}>
                    {restaurantData.map(food => (
                        <CardFood2 key={food.id} food={food} />
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.navigate('CartScreen') }}>
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
        justifyContent: 'center'
    },
    imageContainer: {
        width: '100%',
        height: 180,
        resizeMode: 'cover', // Đảm bảo hình ảnh chiếm toàn bộ diện tích
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
        color: "#000000",
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
        flexDirection: 'row',
        width: '70%',
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 10,
        height: 45,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    pickerContainer: {
        width: '30%',
        borderRadius: 10,
        height: 45,
        backgroundColor: '#FFF',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    picker: {
        height: '100%',
        width: '100%',
        color: 'red',
        borderRadius: 10,

    },
    mainInContainer: {
        flexDirection: 'row',
        width: '90%',
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
        elevation: 5
    }
});