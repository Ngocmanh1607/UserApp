import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardMessage from '../components/CardMessage'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Messages</Text>
            </View>
            <ScrollView>
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFF'
    }, header: {
        //backgroundColor: '#fff',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    textHeader: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000'
    },

})