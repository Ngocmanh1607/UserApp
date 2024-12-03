import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, ActivityIndicator, Image } from 'react-native';
import React, { useState } from 'react';
import llmApi from '../api/llmApi';
import CardFood3 from '../components/CardFood3';

const ChatboxScreen = () => {
    const [products, setProducts] = useState([]);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');

    const [send, setSend] = useState(false);
    const [userSend, setUserSend] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [des, setDes] = useState('');
    const sendMessage = () => {
        setSend(true);
        setIsLoading(true);
        setMessage('');
        const fetchApi = async () => {
            try {
                const response = await llmApi(userSend);
                setProducts(response.product);
                setDes(response.description)
                // console.log(response.description);
            } catch (error) {
                console.error('Error fetching API:', error);
            } finally {
                setIsLoading(false); // Kết thúc loading
            }
        };
        fetchApi();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer}>
                {/* Driver Message */}
                <View style={[styles.messageBubble, styles.driverMessage]}>
                    <Text style={styles.messageText}>Xin chào, tôi có thể giúp gì cho bạn?</Text>
                </View>

                {/* User message */}
                {send && (
                    <View style={[styles.messageBubble, styles.userMessage]}>
                        <Text style={styles.messageText}>{userSend}</Text>
                    </View>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                    <View>
                        <Image source={require('../assets/Images/loading.gif')} style={styles.imageLoading} />
                    </View>
                )}

                {/* Products list */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalScrollView}
                >
                    {products && products.length > 0 && products.map((item) => (
                        <CardFood3 food={item} id={item.restaurant_id} key={item.id} />
                    ))}
                </ScrollView>
                <View style={styles.DesContainer}>
                    <Text style={styles.textDes}>{des}</Text>
                </View>
            </ScrollView>

            {/* Chat Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Bạn muốn ăn gì?"
                    value={message}
                    onChangeText={(text) => {
                        setMessage(text);
                        setUserSend(text);
                        setProducts([]);
                        setDes([]);
                    }}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatboxScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#808080',
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
    horizontalScrollView: {
        marginVertical: 10,
    },
    imageLoading: {
        width: 40,
        height: 15,
        userSelect: 'none'
    },
    DesContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
    },
    textDes: {
        color: '#000',
    }
});
