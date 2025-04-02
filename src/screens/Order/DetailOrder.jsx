import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { formatPrice, formatDate } from '../../utils/format';
import { useRoute } from '@react-navigation/native';
import styles from '../../assets/css/DetailOrderStyle';
const OrderDetailScreen = () => {
  const route = useRoute();
  const order = route.params?.order || {};
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        {/* Driver Information */}
        {order.Driver && (
          <View style={styles.driverInfoContainer}>
            <View style={styles.driverDetails}>
              <Image
                source={{
                  uri:
                    order.Driver.Profile.image ||
                    'https://www.google.com/imgres?q=icon%20shipper%20png&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fcartoon-delivery-worker-with-scooter-bike_180868-5613.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Fdelivery-guy-png%2F7&docid=6GatJwZp5ACmKM&tbnid=EEfVdjJ0j6N55M&vet=12ahUKEwjH2b_NtK6MAxXVD1kFHeqkFgs4ChAzegQITxAA..i&w=626&h=626&hcb=2&itg=1&ved=2ahUKEwjH2b_NtK6MAxXVD1kFHeqkFgs4ChAzegQITxAA',
                }}
                style={styles.driverImage}
              />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>
                  {order.Driver.Profile.name}
                </Text>
                <View style={styles.driverBike}>
                  <Text style={styles.licensePlate}>
                    {order.Driver.license_plate} -{' '}
                  </Text>
                  <Text tyle={styles.licensePlate}>
                    {order.Driver.car_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* Order ID */}
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Mã đơn: {order.id}</Text>
          <Text style={styles.orderTime}>{formatDate(order.order_date)}</Text>
        </View>
        {/* Ordered Items */}
        {order.listCartItem.map((item, index) => (
          <View key={index} style={styles.orderItemContainer}>
            <View style={styles.orderItemDetails}>
              <Image
                source={{ uri: item.image }}
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemText}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                {item.descriptions && (
                  <Text style={styles.orderItemOption}>
                    Mô tả: {item.descriptions}
                  </Text>
                )}
                {item.toppings &&
                  item.toppings.map((option, optIndex) => (
                    <Text key={optIndex} style={styles.orderItemOption}>
                      {option.topping_name}
                    </Text>
                  ))}
                <Text style={styles.orderItemOption}>
                  Số lượng: {item.quantity}
                </Text>
                <Text style={styles.orderItemPrice}>
                  Giá: {formatPrice(item.price)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {/* Note */}
        {order.note && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>Ghi chú</Text>
            <Text style={styles.noteText}>{order.note}</Text>
          </View>
        )}
        {/* Payment Information */}
        <View style={styles.summaryContainer}>
          <Text style={styles.textBold}>Chi tiết thanh toán</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tạm tính</Text>
            <Text style={styles.value}>{formatPrice(order.price)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phí áp dụng</Text>
            <Text style={styles.value}>{formatPrice(order.delivery_fee)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Giảm giá</Text>
            <Text style={styles.value}>{formatPrice(0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.paymentMethod}>Trả qua: {order.order_pay}</Text>
            <Text style={styles.orderTotal}>{formatPrice(order.price)}</Text>
          </View>
        </View>

        {/* Reorder Button */}
        {/* <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.reorderButtonText}>Đặt lại món</Text>
                </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;
