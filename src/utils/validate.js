import Snackbar from 'react-native-snackbar';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    Snackbar.show({
      text: 'Vui lòng nhập email.',
      duration: Snackbar.LENGTH_SHORT,
    });
    return false;
  }
  if (!emailRegex.test(email)) {
    Snackbar.show({
      text: 'Email không hợp lệ.',
      duration: Snackbar.LENGTH_SHORT,
    });
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    Snackbar.show({
      text: 'Mật khẩu phải chứa ít nhất 6 ký tự.',
      duration: Snackbar.LENGTH_SHORT,
    });
    return false;
  }
  return true;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || password !== confirmPassword) {
    Snackbar.show({
      text: 'Xác nhận mật khẩu không khớp.',
      duration: Snackbar.LENGTH_SHORT,
    });
    return false;
  }
  return true;
};

export const validateUserInputs = (email, password, confirmPassword) => {
  if (!validateEmail(email)) return false;
  if (!validatePassword(password)) return false;
  if (!validateConfirmPassword(password, confirmPassword)) return false;
  return true;
};
