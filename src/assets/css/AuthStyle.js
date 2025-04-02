import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  topImageContainer: {
    height: '35%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Đảm bảo hình ảnh phủ kín phần trên
  },
  animatedContainer: {
    flex: 1,
    left: 0,
    right: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    zIndex: 1,
  },
});
export default styles;
