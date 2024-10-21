import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

const MessageScreen = ({ route }) => {
    const { orderName } = route.params;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headContainer}>
                <TouchableOpacity>
                    <AntDesign name='arrowleft' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Message</Text>
            </View>

            {/* Messages */}
            <View style={styles.chatContainer}>
                {/* User Message */}
                <View style={[styles.messageBubble, styles.userMessage]}>
                    <Text style={styles.messageText}>Hello</Text>
                </View>

                {/* Driver Message */}
                <View style={[styles.messageBubble, styles.driverMessage]}>
                    <Text style={styles.messageText}>Hi! How can I help you?</Text>
                </View>

                {/* More Messages */}
                <View style={[styles.messageBubble, styles.userMessage]}>
                    <Text style={styles.messageText}>I need the food delivered by 5 PM.</Text>
                </View>

                <View style={[styles.messageBubble, styles.driverMessage]}>
                    <Text style={styles.messageText}>Sure, I’m on my way!</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    backButton: {
        position: 'absolute',
        left: 5,
        zIndex: 1,
        padding: 10,
    },
    headContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        marginVertical: 20,
        paddingLeft: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    chatContainer: {
        padding: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084FF',
    },
    driverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    driverMessageText: {
        color: '#000',
    },
});