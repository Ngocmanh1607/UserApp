import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';

const MessageScreen = ({ route }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        // Xử lý logic gửi tin nhắn
        console.log("Tin nhắn đã gửi:", message);
        setMessage(''); // Xóa tin nhắn sau khi gửi
    };

    return (
        <View style={styles.container}>
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

            {/* Chat Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    chatContainer: {
        flex: 1,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#0084FF',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});