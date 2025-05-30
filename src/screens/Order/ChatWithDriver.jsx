import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thay URL server của bạn
const socket = io('https://vpvt75qh-3000.asse.devtunnels.ms');

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const androidVersion = Platform.Version;

    try {
      let granted;

      if (androidVersion >= 33) {
        // Android 13+ (API 33+) - Sử dụng READ_MEDIA_IMAGES
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Quyền truy cập thư viện ảnh',
            message: 'Ứng dụng cần quyền truy cập thư viện ảnh để gửi ảnh.',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          }
        );
      } else {
        // Android < 13 - Sử dụng READ_EXTERNAL_STORAGE
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập thư viện ảnh',
            message: 'Ứng dụng cần quyền truy cập thư viện ảnh để gửi ảnh.',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          }
        );
      }

      console.log('Android Version:', androidVersion);
      console.log('Permission result:', granted);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  }
  return true; // iOS tự động cấp quyền
};

// Hàm kiểm tra permission đã được cấp chưa
const checkGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const androidVersion = Platform.Version;

    try {
      let permission;

      if (androidVersion >= 33) {
        permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const hasPermission = await PermissionsAndroid.check(permission);
      console.log('Has permission:', hasPermission);
      return hasPermission;
    } catch (err) {
      console.warn('Permission check error:', err);
      return false;
    }
  }
  return true;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
};

// Hàm kiểm tra quyền truy cập camera
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Quyền truy cập Camera',
        message: 'Ứng dụng cần quyền truy cập camera để chụp ảnh.',
        buttonNeutral: 'Hỏi lại sau',
        buttonNegative: 'Hủy',
        buttonPositive: 'Đồng ý',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS tự động cấp quyền
};

const MessageScreen = () => {
  const route = useRoute();
  const { driverId, customerId } = route.params;
  const scrollViewRef = useRef();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const MESSAGES_PER_PAGE = 20;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };
    fetchUserId();
  }, []);
  const handleReceiveMessage = ({ senderId, message, role, type, date }) => {
    console.log('Message received:', {
      senderId,
      message,
      role,
      type,
      date,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId, message, role, type, date },
    ]);
  };

  useEffect(() => {
    if (!userId) return;
    // Register user when userId is available
    socket.emit('registerUser', userId);
    socket.emit('joinChat', {
      senderId: customerId,
      receiverId: driverId,
      role: 'user',
      role_receiver: 'driver',
    });

    // Listen for more messages response
    const handleMoreMessages = ({ messages: newMessages, hasMore }) => {
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      setHasMore(hasMore);
      setIsLoadingMore(false);
    };
    socket.on('chatHistory', (chatHistory) => {
      if (chatHistory) {
        const filterMessageProperties = (messages) => {
          return messages.map((msg) => ({
            senderId: msg.senderId,
            message: msg.message.trim(),
            role: msg.role,
            type: msg.type,
            date: msg.date,
          }));
        };
        const listMessages = filterMessageProperties(chatHistory.messages);
        console.log(listMessages);

        setMessages(listMessages);
      } else {
        console.log('No chat history found');
        setMessages([]);
      }
    });
    // Listen for load more errors
    const handleLoadMoreError = ({ message }) => {
      console.error('Load more error:', message);
      setIsLoadingMore(false);
      Alert.alert('Error', 'Failed to load older messages');
    };

    socket.on('receiveMessage', ({ senderId, message, role, type, date }) => {
      console.log('Message received:', {
        senderId,
        message,
        role,
        type,
        date,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId, message, role, type, date },
      ]);
    });
    socket.on('moreMessages', handleMoreMessages);
    socket.on('loadMoreError', handleLoadMoreError);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('moreMessages', handleMoreMessages);
      socket.off('loadMoreError', handleLoadMoreError);
    };
  }, [userId]);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Hàm chọn ảnh từ thư viện (ĐÃ SỬA)
  const pickImage = async () => {
    try {
      // Kiểm tra permission trước
      const hasPermission = await checkGalleryPermission();

      if (!hasPermission) {
        // Request permission nếu chưa có
        const granted = await requestGalleryPermission();

        if (!granted) {
          Alert.alert(
            'Quyền bị từ chối',
            'Bạn cần cấp quyền để sử dụng tính năng này. Vui lòng vào Settings > Apps > [Tên App] > Permissions để cấp quyền.'
          );
          return;
        }
      }

      console.log('Opening image library...');

      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
          includeBase64: true,
        },
        (response) => {
          console.log('ImagePicker response:', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
            Alert.alert(
              'Lỗi',
              'Không thể mở thư viện ảnh: ' + response.errorMessage
            );
          } else if (response.assets && response.assets.length > 0) {
            const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
            sendImage(base64Image);
          }
        }
      );
    } catch (error) {
      console.error('Error in pickImage:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi mở thư viện ảnh');
    }
  };

  // Hàm chụp ảnh từ camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Quyền bị từ chối',
        'Bạn cần cấp quyền để sử dụng tính năng này.'
      );
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
          sendImage(base64Image);
        }
      }
    );
  };

  // Hàm gửi ảnh
  const sendImage = (base64Image) => {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();

    socket.emit('sendMessage', {
      senderId: customerId,
      receiverId: driverId,
      message: base64Image,
      role: 'user',
      type: 'image',
      date: timestamp,
      role_receiver: 'driver',
    });

    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   {
    //     senderId: customerId,
    //     message: base64Image,
    //     role: 'user',
    //     type: 'image',
    //     date: timestamp,
    //   },
    // ]);
  };

  // Hàm gửi tin nhắn văn bản
  const sendMessage = () => {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
    if (message.trim()) {
      socket.emit('sendMessage', {
        senderId: customerId,
        receiverId: driverId,
        message: message.trim(),
        role: 'user',
        type: 'text',
        date: timestamp,
        role_receiver: 'driver',
      });

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     senderId: customerId,
      //     message: message.trim(),
      //     role: 'user',
      //     type: 'text',
      //     date: timestamp,
      //   },
      // ]);
      setMessage('');
    }
  };

  const loadMoreMessages = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      const offset = page * MESSAGES_PER_PAGE;

      socket.emit('loadMoreMessages', {
        senderId: customerId,
        receiverId: driverId,
        offset,
        limit: MESSAGES_PER_PAGE,
      });

      setPage((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContentContainer}
        onScroll={({ nativeEvent }) => {
          // Check if scrolled to top
          if (nativeEvent.contentOffset.y === 0 && hasMore) {
            loadMoreMessages();
          }
        }}
        scrollEventThrottle={400}>
        {isLoadingMore && (
          <View style={styles.loadingMoreContainer}>
            <Text style={styles.loadingMoreText}>Loading more messages...</Text>
          </View>
        )}
        {messages.map((msg, index) => (
          <View key={index}>
            <View
              style={[
                styles.messageBubble,
                msg.role === 'user'
                  ? styles.userMessage
                  : styles.contactMessage,
              ]}>
              {msg.type === 'text' ? (
                <Text
                  style={[
                    styles.messageText,
                    msg.role === 'user'
                      ? styles.userMessageText
                      : styles.contactMessageText,
                  ]}>
                  {msg.message}
                </Text>
              ) : (
                <Image
                  source={{ uri: msg.message }}
                  style={styles.imageMessage}
                />
              )}
            </View>
            {/* Hiển thị thời gian gửi */}
            <Text
              style={[
                styles.timestamp,
                msg.role === 'user'
                  ? styles.userTimestamp
                  : styles.contactTimestamp,
              ]}>
              {formatTime(msg.date)}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* Chat Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
              multiline
            />
            <View style={styles.attachButtonsContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                <Text style={styles.iconText}>📷</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
                <Text style={styles.iconText}>📸</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#075E54',
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  typingText: {
    color: '#075E54',
    fontSize: 14,
    fontStyle: 'italic',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 5,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 2,
    marginLeft: 50,
  },
  contactMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
    marginRight: 50,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#000',
  },
  contactMessageText: {
    color: '#000',
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  userTimestamp: {
    textAlign: 'right',
    marginLeft: 50,
  },
  contactTimestamp: {
    textAlign: 'left',
    marginRight: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    color: '#333',
  },
  attachButtonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  iconText: {
    fontSize: 20,
  },
  sendButton: {
    width: 45,
    height: 45,
    backgroundColor: '#075E54',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#A8BEC0',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  loadingMoreContainer: {
    padding: 10,
    alignItems: 'center',
  },
  loadingMoreText: {
    color: '#666',
    fontSize: 14,
  },
});
