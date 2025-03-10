import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
const ArrowBack = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
            <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
    )
}

export default ArrowBack

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 5,
        padding: 10,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 10,
    },
})