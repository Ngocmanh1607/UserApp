import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardMessage from '../components/CardMessage'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
                <CardMessage />
            </ScrollView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFF'
        marginTop: 10
    },
    textHeader: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000'
    },

})