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
        width: '98%',
        height: 180,
        alignSelf: 'center',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    slide: {
        width: '99%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    nextButton: {
        fontSize: 20,
        fontWeight: '600',
        backgroundColor: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        textAlign: 'center',
        lineHeight: 20,

    }
})