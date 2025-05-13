import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

const requestMediaPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }

  try {
    if (Platform.Version >= 33) {
      return await requestAndroid13Permissions();
    } else {
      return await requestLegacyAndroidPermissions();
    }
  } catch (err) {
    console.warn('Lỗi khi yêu cầu quyền truy cập:', err);
    handlePermissionDenied();
    return false;
  }
};

const requestAndroid13Permissions = async () => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  ];

  const hasPermissions = await Promise.all(
    permissions.map((permission) => PermissionsAndroid.check(permission))
  );

  if (hasPermissions.every((status) => status === true)) {
    return true;
  }

  const results = await PermissionsAndroid.requestMultiple(permissions);
  const granted = Object.values(results).every(
    (status) => status === PermissionsAndroid.RESULTS.GRANTED
  );

  if (!granted) {
    handlePermissionDenied();
  }

  return granted;
};

const requestLegacyAndroidPermissions = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission, {
    title: 'Quyền truy cập ảnh',
    message:
      'Ứng dụng cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện',
    buttonNeutral: 'Hỏi lại sau',
    buttonNegative: 'Từ chối',
    buttonPositive: 'Đồng ý',
  });

  const granted = status === PermissionsAndroid.RESULTS.GRANTED;

  if (!granted) {
    handlePermissionDenied();
  }

  return granted;
};

const handlePermissionDenied = () => {
  Alert.alert(
    'Quyền bị từ chối',
    'Bạn cần cấp quyền truy cập thư viện ảnh để thay đổi ảnh đại diện',
    [
      {
        text: 'Đi tới Cài đặt',
        onPress: () => Linking.openSettings(),
      },
      {
        text: 'Đóng',
        style: 'cancel',
      },
    ]
  );
};

export default requestMediaPermission;
