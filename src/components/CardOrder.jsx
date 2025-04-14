import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatPrice, formatDate } from '../utils/format';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardOrder = ({ order }) => {
  const navigation = useNavigation();

  const getOrderStatus = (status) => {
    const statusMapping = {
      ORDER_CANCELED: 'Đơn hàng đã bị hủy',
      ORDER_CONFIRMED: 'Hoàn thành',
      ORDER_PENDING: 'Đang xử lý',
      ORDER_PROCESSING: 'Đang chuẩn bị',
      ORDER_DELIVERING: 'Đang giao hàng',
    };

    return statusMapping[status] || 'Theo dõi đơn hàng';
  };

  const getStatusIcon = (status) => {
    const iconMapping = {
      ORDER_CANCELED: 'cancel',
      ORDER_CONFIRMED: 'check-circle',
      ORDER_PENDING: 'hourglass-empty',
      ORDER_PROCESSING: 'restaurant',
      ORDER_DELIVERING: 'delivery-dining',
    };

    return iconMapping[status] || 'receipt-long';
  };

  const getStatusColor = (status) => {
    if (status === 'ORDER_CONFIRMED') return COLORS.success;
    if (status === 'ORDER_CANCELED') return COLORS.error;
    return COLORS.warning;
  };

  const handlePressOrder = (id, order_status, customer_id) => {
    if (order_status !== 'ORDER_CANCELED') {
      navigation.navigate('OrderStatus', {
        orderId: id,
        customerId: customer_id,
      });
    }
  };

  return (
    <View style={styles.orderCard}>
      {/* Status Banner */}
      <View
        style={[
          styles.statusBanner,
          { backgroundColor: getStatusColor(order.order_status) },
        ]}>
        <MaterialIcons
          name={getStatusIcon(order.order_status)}
          size={16}
          color="#FFF"
        />
        <Text style={styles.statusText}>
          {getOrderStatus(order.order_status)}
        </Text>
        <Text style={styles.orderDate}>{formatDate(order.order_date)}</Text>
      </View>

      {/* Restaurant Info */}
      <View style={styles.restaurantSection}>
        <Image
          source={{ uri: order.Restaurant.image }}
          style={styles.restaurantImage}
        />

        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {order.Restaurant.name}
          </Text>
          <View style={styles.detailsRow}>
            <MaterialIcons
              name="restaurant"
              size={14}
              color={COLORS.textMedium}
            />
            <Text style={styles.detailsText}>
              {order.listCartItem.length} món
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <MaterialIcons
              name="attach-money"
              size={14}
              color={COLORS.textMedium}
            />
            <Text style={styles.detailsText}>{formatPrice(order.price)}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => navigation.navigate('DetailOrder', { order: order })}>
          <MaterialIcons name="receipt-long" size={16} color={COLORS.primary} />
          <Text style={styles.viewDetailsText}>Xem chi tiết</Text>
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          {order.order_status !== 'ORDER_CANCELED' && (
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() =>
                handlePressOrder(
                  order.id,
                  order.order_status,
                  order.customer_id
                )
              }>
              <MaterialIcons
                name="location-on"
                size={16}
                color={COLORS.secondary}
              />
              <Text style={styles.trackButtonText}>Theo dõi</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Nút điều hướng sang chat với tài xế */}
        {order.driver_id && (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              navigation.navigate('ChatWithDriver', {
                driverId: order.driver_id,
                customerId: order.customer_id,
              })
            }>
            <MaterialIcons name="chat" size={16} color={COLORS.secondary} />
            <Text style={styles.chatButtonText}>Nhắn tài xế</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderButtonText}>Đặt lại</Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
};

// Theme constants
const COLORS = {
  primary: '#ff4d4d',
  secondary: '#0066cc',
  success: '#28a745',
  warning: '#ff9800',
  error: '#dc3545',
  background: '#ffffff',
  cardBackground: '#ffffff',
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#999999',
  border: '#eeeeee',
  shadow: '#00000020',
};
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Status Banner
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  orderDate: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 'auto',
    fontWeight: '500',
  },

  // Restaurant Section
  restaurantSection: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  restaurantImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  detailsText: {
    fontSize: 14,
    color: COLORS.textMedium,
    marginLeft: 6,
  },

  // Action Section
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  trackButtonText: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  reorderButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButtonText: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default CardOrder;
