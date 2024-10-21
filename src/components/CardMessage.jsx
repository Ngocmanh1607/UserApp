import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CardMessage = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Message', { orderName: 'Đơn hàng số 1' })}
        >
            <View>
                <Image
                    source={require('../assets/Images/pop_2.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Đơn hàng số 1</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CardMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        height: 60,
        backgroundColor: '#FFF',
        elevation: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
    },
    textContainer: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
});