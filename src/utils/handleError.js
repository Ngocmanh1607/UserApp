import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const HandleApiError = (error, showAlert = true) => {
    const navigation = useNavigation();
    // Khởi tạo thông tin lỗi mặc định
    let errorMessage = 'Đã xảy ra lỗi khi kết nối đến máy chủ';
    let statusCode = 500;

    // Xử lý lỗi từ response API
    if (error.response) {
        statusCode = error.response.status;
        // Xử lý theo mã lỗi
        switch (statusCode) {
            case 400:
                errorMessage = 'Yêu cầu không hợp lệ';
                break;
            case 401:
                errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại';
                break;
            case 404:
                errorMessage = 'Không tìm thấy dữ liệu yêu cầu';
                break;
            case 500:
                errorMessage = 'Lỗi máy chủ. Vui lòng thử lại sau';
                break;
            default:
                // Nếu máy chủ trả về message thì hiển thị
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
        }
    }
    else if (error.request) {
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng';
        statusCode = 0;
    }
    else if (error.message) {
        errorMessage = error.message;
    }

    // Hiển thị thông báo lỗi
    if (showAlert) {
        if (errorMessage === "Phiên hết hạn") {
            Alert.alert('Đã xảy ra lỗi', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
            navigation.navigate('Auth');
        }
        else {
            Alert.alert('Đã xảy ra lỗi', errorMessage);
        }
    }

    // Log lỗi ra console để debug
    console.error('API Error:', { message: errorMessage, status: statusCode, error });

    // Trả về đối tượng lỗi
    return {
        message: errorMessage,
        status: statusCode
    };
};
