import messaging from '@react-native-firebase/messaging';
import { Alert, Linking, Platform } from 'react-native';

const fetchFcmToken = async () => {
  try {
    // Kiểm tra quyền hiện tại
    const currentPermission = await messaging().hasPermission();
    const needsPermission =
      currentPermission === messaging.AuthorizationStatus.NOT_DETERMINED;

    // Chỉ yêu cầu quyền nếu chưa được xác định
    if (needsPermission) {
      const authStatus = await messaging().requestPermission();
      const permissionGranted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!permissionGranted) {
        console.log('Người dùng từ chối quyền thông báo.');
        Alert.alert(
          'Cấp quyền thông báo',
          'Ứng dụng cần quyền thông báo để gửi thông tin đơn hàng. Vui lòng bật quyền trong cài đặt.',
          [
            {
              text: 'Đi đến Cài đặt',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Để sau', style: 'cancel' },
          ]
        );
        return null;
      }
    }

    // Xử lý riêng cho iOS
    if (Platform.OS === 'ios') {
      const apnsToken = await messaging().getAPNSToken();
      if (!apnsToken) {
        console.warn('APNs token chưa sẵn sàng');
        // Không return null ở đây, vẫn thử lấy FCM token
      }
    }

    // Lấy và kiểm tra FCM token
    const token = await messaging().getToken();
    if (!token) {
      throw new Error('Không thể lấy FCM token');
    }

    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Lỗi khi lấy FCM token:', error);
    // Thông báo lỗi cho người dùng nếu cần
    Alert.alert(
      'Thông báo',
      'Không thể kết nối đến dịch vụ thông báo. Vui lòng thử lại sau.'
    );
    return null;
  }
};

export default fetchFcmToken;
