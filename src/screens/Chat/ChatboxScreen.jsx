import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getChatllm, llmApi, postSendData } from '../../api/llmApi';
import CardFood3 from '../../components/CardFood3';
import styles from '../../assets/css/ChatboxStyle';
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
        setChatHistory(finalSortedData);
      }
    };
    fetchGetChat();
  }, []);
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
      console.log('Đã nhận được phản hồi từ API:', response);

      const botResponse =
        response.description || 'Xin lỗi, tôi không hiểu yêu cầu của bạn.';
      const products = response.product || [];
      const productIds = products.map((item) => item.id);

      const botMessages = [
        { type: 'bot', text: botResponse },
        ...(products.length > 0 ? [{ type: 'products', items: products }] : []),
      ];
      // Thêm vào danh sách tin nhắn mới nhất để gửi
      newMessages.push(
        { type: 'bot', text: botResponse },
        ...(products.length > 0
          ? [{ type: 'products', items: productIds }]
          : [])
      );
      setChatHistory((prevChat) => [...prevChat, ...botMessages]);
      console.log(newMessages);
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
      <FlatList
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={chatHistory}
        ref={scrollViewRef}
        keyExtractor={(_, index) => index.toString()}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        renderItem={({ item: chat, index }) => {
          if (chat.type === 'user' || chat.type === 'bot') {
            return (
              <View
                style={[
                  styles.messageBubble,
                  chat.type === 'user' ? styles.userMessage : styles.botMessage,
                ]}>
                <Text style={styles.messageText}>{chat.text}</Text>
              </View>
            );
          } else if (chat.type === 'products') {
            return (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScrollView}>
                {chat.items && (
                  <CardFood3
                    products={chat.items}
                    restaurantId={chat.items[0].restaurant_id}
                  />
                )}
              </ScrollView>
            );
          }
          return null;
        }}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={styles.loadingContainer}>
              <Image
                source={require('../../assets/Images/loading.gif')}
                style={styles.imageLoading}
              />
            </View>
          ) : null
        }
      />

      {/* Input container remains the same */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bạn muốn ăn gì?"
          placeholderTextColor="#333"
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
