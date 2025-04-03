import { cart } from '../api/cartOrder';
export default async function getQuantity(restaurantId) {
  const cartData = await cart.getCart(restaurantId);
  if (cartData.success) {
    return cartData.data.length;
  } else {
    if (cartData.message === 500) {
      Alert.alert('Lỗi', 'Hết phiên làm việc.Vui lòng đăng nhập lại', {
        text: 'OK',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        },
      });
    } else {
      return 0;
    }
  }
}
