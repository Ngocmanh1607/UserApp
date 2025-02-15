import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React from "react";

const CardSlider = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.cardhead}>Các quán gần đây</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.card} >
                    <View>
                        <Image source={require('../assets/Images/pizza1.jpg')} style={styles.cardimage} />
                    </View>

                    <View style={styles.cardin1}>
                        <Text style={styles.cardin1txt}>Pizza</Text>

                        <View style={styles.cardin2}>
                            <Text style={styles.cardin2txt1}>Fast food</Text>
                            <Text style={styles.cardin2txt1}>Price 100$</Text>
                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View>
                        <Image source={require('../assets/Images/pizza2.jpg')} style={styles.cardimage} />
                    </View>

                    <View style={styles.cardin1}>
                        <Text style={styles.cardin1txt}>Pizza</Text>

                        <View style={styles.cardin2}>
                            <Text style={styles.cardin2txt1}>Fast food</Text>
                            <Text style={styles.cardin2txt1}>Price 100$</Text>
                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View>
                        <Image source={require('../assets/Images/pizza3.jpg')} style={styles.cardimage} />
                    </View>

                    <View style={styles.cardin1}>
                        <Text style={styles.cardin1txt}>Pizza</Text>

                        <View style={styles.cardin2}>
                            <Text style={styles.cardin2txt1}>Fast food</Text>
                            <Text style={styles.cardin2txt1}>Price 100$</Text>
                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <View>
                        <Image source={require('../assets/Images/pizza4.jpg')} style={styles.cardimage} />
                    </View>

                    <View style={styles.cardin1}>
                        <Text style={styles.cardin1txt}>Pizza</Text>

                        <View style={styles.cardin2}>
                            <Text style={styles.cardin2txt1}>Fast food</Text>
                            <Text style={styles.cardin2txt1}>Price 100$</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default CardSlider

const styles = StyleSheet.create({
    container: {
        
    },
    cardhead: {
        fontSize: 18,
        fontWeight: '500',
        marginHorizontal: 10,
        paddingLeft: 5
    },
    cardimage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    card: {
        width: 250,
        height: 150,
        marginLeft: 10,
        marginVertical:5,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: '#fff',
    },
    cardin1: {
        marginHorizontal: 3,
        marginTop: 3,
    },
    cardin1txt: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5
    },
    cardin2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    cardin2txt1: {
        fontSize: 14,
        marginRight: 10,
        fontWeight: '500'
    }
})