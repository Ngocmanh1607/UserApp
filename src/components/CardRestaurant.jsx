import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CardRestaurant = ({ restaurant }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('RestaurantDetail', { restaurant });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={restaurant.image} style={styles.imageContainer} />
            <View>
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
        </TouchableOpacity>
    );
}

export default CardRestaurant;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flexDirection: 'row',
        elevation: 5,
    },
    imageContainer: {
        width: 80,
        height: 80,
        margin: 5,
        borderRadius: 10,
    },
    text: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '600',
        color: "#000000",
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingRight: 10,
        borderRightWidth: 1,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 16,
        color: '#000',
    },
    bottomContainer: {
        flexDirection: 'row',
    },
    disContainer: {
        marginTop: 10,
    },
    textDis: {
        fontSize: 16,
    },
    heart: {
        justifyContent: 'flex-end',
        marginLeft: 20,
    },
});