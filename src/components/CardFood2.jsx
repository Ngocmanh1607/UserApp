import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

const CardFood2 = ({ food }) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('FoodDetail') }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/Images/pop_2.png')}
                        style={styles.foodImage}
                    />
                </View>
                <SafeAreaView >
                    <View style={styles.foodNameContainer}>
                        <Text style={styles.foodName}>{food.name}</Text>
                    </View>
                    <View style={styles.foodDesContainer}>
                        <Text style={styles.foodDescription} numberOfLines={2}>
                            {food.description}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$ {food.price}</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <MaterialIcons name="add" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CardFood2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        elevation: 5,
        width: "100%",
        height: 100,
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    foodImage: {
        width: 80,
        height: 80,
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'left',
    },
    foodDesContainer: {
        marginBottom: 16,
    },
    foodDescription: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 18,
        color: '#FF0000',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        padding: 7,
        marginBottom: 10
    },
    imageContainer: {
        marginRight: 10
    },
    foodNameContainer: {
        marginTop: 5
    }
});