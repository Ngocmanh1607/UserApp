import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const Categories = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePress = (index) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.box, { backgroundColor: selectedIndex === 0 ? '#FF0000' : '#ffffff' }]}
                    onPress={() => handlePress(0)}>
                    <Image source={require('../Images/icon_1.png')} style={styles.image} />
                    <Text style={[styles.text, { color: selectedIndex === 0 ? '#ffffff' : '#000000' }]}>Pizza</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.box, { backgroundColor: selectedIndex === 1 ? '#FF0000' : '#ffffff' }]}
                    onPress={() => handlePress(1)}>
                    <Image source={require('../Images/icon_2.png')} style={styles.image} />
                    <Text style={[styles.text, { color: selectedIndex === 1 ? '#ffffff' : '#000000' }]}>Burger</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.box, { backgroundColor: selectedIndex === 2 ? '#FF0000' : '#ffffff' }]}
                    onPress={() => handlePress(2)}>
                    <Image source={require('../Images/icon_3.png')} style={styles.image} />
                    <Text style={[styles.text, { color: selectedIndex === 2 ? '#ffffff' : '#000000' }]}>Drink</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.box, { backgroundColor: selectedIndex === 3 ? '#FF0000' : '#ffffff' }]}
                    onPress={() => handlePress(3)}>
                    <Image source={require('../Images/icon_4.png')} style={styles.image} />
                    <Text style={[styles.text, { color: selectedIndex === 3 ? '#ffffff' : '#000000' }]}>Noodles</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        elevation: 5
    },
    image: {
        width: 30,
        height: 30
    },
    box: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#FF0000',
        width: 'auto',
    },
    text: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '500',
    }
});