import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Swiper from 'react-native-swiper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const OfferSlider = () => {
    return (
        <View style={styles.container}>
            <Swiper
                autoplay={true}
                autoplayTimeout={3}
                showButtons={true}
                dotColor={'red'}
                activeDotColer={"black"}
                nextButton={<Text style={styles.nextButton}>  </Text>}
                prevButton={<Text style={styles.nextButton}>  </Text>}
            >
                <View style={styles.slide}>
                    <Image source={require('../assets/Images/sampleImg1.jpeg')} style={styles.image} />
                </View>
                <View style={styles.slide} >
                    <Image source={require('../assets/Images/sampleImg2.jpeg')} style={styles.image} />
                </View>
                <View style={styles.slide}>
                    <Image source={require('../assets/Images/sampleImg3.jpeg')} style={styles.image} />
                </View>
            </Swiper>
        </View>
    )
}
export default OfferSlider
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover'
    },
    slide: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    nextButton: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
    }
})