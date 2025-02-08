import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getChatllm, llmApi, postSendData, } from '../../api/llmApi';
import CardFood2 from '../../components/CardFoodInCate';

const ChatboxScreen = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const scrollViewRef = useRef();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const sortedData = [];

    useEffect(() => {
        const fetchGetChat = async () => {
            const data = await getChatllm();
            let currentBlock = { user: null, bot: null, products: null };
            data.forEach((item) => {
                if (item.type === 'user') {
                    // Nếu gặp user mới, đẩy block cũ vào sortedData (nếu đầy đủ)
                    if (currentBlock.user || currentBlock.bot || currentBlock.products) {
                        sortedData.push(currentBlock);
                        currentBlock = { user: null, bot: null, products: null };
                    }
                    currentBlock.user = item;
                } else if (item.type === 'bot') {
                    currentBlock.bot = item;
                } else if (item.type === 'products') {
                    currentBlock.products = item;
                }
            });
            // Đẩy block cuối cùng vào mảng (nếu còn dư)
            if (currentBlock.user || currentBlock.bot || currentBlock.products) {
                sortedData.push(currentBlock);
            }

            // Trích xuất các block trở lại dạng phẳng
            const finalSortedData = sortedData.flatMap((block) =>
                [block.user, block.bot, block.products].filter(Boolean)
            );

            if (finalSortedData) {
                setChatHistory(finalSortedData)
            }
        }
        fetchGetChat()
    }, [])
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [chatHistory]);

    const fetchSend = async (data) => {
        await postSendData(data);
    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        setIsLoading(true);
        const userMessage = { type: 'user', text: message };

        // Cập nhật lịch sử chat và dữ liệu gửi
        setChatHistory((prevChat) => [...prevChat, userMessage]);
        const newMessages = [userMessage];

        try {
            const response = await llmApi(message);
            const botResponse = response.description || "Xin lỗi, tôi không hiểu yêu cầu của bạn.";
            const products = response.product || [];
            const productIds = products.map((item) => item.id);

            const botMessages = [
                { type: 'bot', text: botResponse },
                ...(products.length > 0
                    ? [{ type: 'products', items: products }]
                    : []),
            ];
            // Thêm vào danh sách tin nhắn mới nhất để gửi
            newMessages.push(
                { type: 'bot', text: botResponse },
                ...(products.length > 0 ? [{ type: 'products', items: productIds }] : [])
            );
            setChatHistory((prevChat) => [...prevChat, ...botMessages]);
            console.log(newMessages)
            // Gửi dữ liệu sau khi cập nhật
            await fetchSend(newMessages);
        } catch (error) {
            console.error('Error fetching API:', error);
            setChatHistory((prevChat) => [
                ...prevChat,
                { type: 'bot', text: 'Đã xảy ra lỗi, vui lòng thử lại.' },
            ]);
        } finally {
            setMessage('');
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 10 }} ref={scrollViewRef}>
                {chatHistory.map((chat, index) => {
                    if (chat.type === 'user' || chat.type === 'bot') {
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.messageBubble,
                                    chat.type === 'user' ? styles.userMessage : styles.botMessage,
                                ]}
                            >
                                <Text style={styles.messageText}>{chat.text}</Text>
                            </View>
                        );
                    } else if (chat.type === 'products') {
                        return (
                            <ScrollView
                                key={index}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.horizontalScrollView}
                            >
                                {chat.items.map((item) => (
                                    <CardFood2 food={item} id={item.restaurant_id} key={item.id} />
                                ))}
                            </ScrollView>
                        );
                    }
                    return null;
                })}

                {/* Loading Indicator */}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <Image
                            source={require('../../assets/Images/loading.gif')}
                            style={styles.imageLoading}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Bạn muốn ăn gì?"
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
    botMessage: {
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
        height: 40,
    },
    loadingContainer: {
        marginVertical: 10,
    },
});
