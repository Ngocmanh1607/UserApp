import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { formatPrice, formatDate } from '../../utils/format';
import { useRoute } from '@react-navigation/native';
import styles from '../../assets/css/DetailOrderStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getCurrentDaySchedule,
  checkIsOpen,
} from '../../utils/restaurantHelpers';
import { Modal } from 'react-native-paper';
import { orderApi } from '../../api/orderApi';
const OrderDetailScreen = () => {
  const route = useRoute();
  const order = route.params?.order || {};
  const [existingFeedback, setExistingFeedback] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [canCreateReport, setCanCreateReport] = useState(true);

  const schedule = getCurrentDaySchedule(order.Restaurant?.opening_hours);
  const isOpen = checkIsOpen(schedule);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await orderApi.getFeedbackByOrderId(order.id);
        if (response && response.data) {
          setExistingFeedback(response.data);
          const userFeedback = response.data.filter(
            (item) => !item.restaurant_res
          )[0];
          const restaurantResponse = response.data.filter(
            (item) => item.restaurant_res
          )[0];

          const feedbackDate = new Date(userFeedback.createdAt);
          const currentDate = new Date();
          const dayDifference =
            (currentDate - feedbackDate) / (1000 * 60 * 60 * 24);
          setCanCreateReport(restaurantResponse || dayDifference > 1);
        }
      } catch (error) {
        console.log('Error fetching feedback:', error);
      }
    };

    if (order.id) {
      fetchFeedback();
    }
  }, [order.id]);
  const handleFeedback = () => {
    setModalVisible(true);
  };
  const handleReport = async (customerId, id) => {
    try {
      await orderApi.sendFeedbackForAdmin(customerId, id);
      Alert.alert(
        'Thành công',
        'Cảm ơn bạn đã gửi báo cáo! Quản trị viên sẽ xem xét sớm nhất có thể.'
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi báo cáo. Vui lòng thử lại sau.');
    }
  };
  const submitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung phản hồi');
      return;
    }
    const feedbackData = {
      order_id: order.id,
      restaurant_id: order.Restaurant?.id,
      customer_id: order.customer_id,
      driver_id: order.Driver?.id,
      content: feedback,
    };
    try {
      await orderApi.submitFeedback(feedbackData);
      Alert.alert(
        'Thành công',
        'Cảm ơn bạn đã gửi phản hồi! Vui lòng đợi trong giây lát.'
      );
      setModalVisible(false);
      setFeedback('');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi phản hồi. Vui lòng thử lại sau.');
    }
  };
  const renderFeedbackSection = () => {
    if (!existingFeedback) return null;

    const userFeedback = existingFeedback.filter(
      (item) => !item.restaurant_res
    )[0];
    const restaurantResponse = existingFeedback.filter(
      (item) => item.restaurant_res
    )[0];

    return (
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackSectionTitle}>Phản hồi đơn hàng</Text>

        {/* User Feedback */}
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackAuthor}>Phản hồi của bạn</Text>
            <Text style={styles.feedbackDate}>
              {formatDate(userFeedback.createdAt)}
            </Text>
          </View>
          <Text style={styles.feedbackContent}>{userFeedback.content}</Text>
          <View style={styles.feedbackStatus}>
            <MaterialIcons
              name={restaurantResponse ? 'check-circle' : 'hourglass-empty'}
              size={16}
              color={restaurantResponse ? '#059669' : '#f59e0b'}
            />
            <Text
              style={[
                styles.statusText,
                {
                  color: userFeedback.is_checked ? '#059669' : '#f59e0b',
                },
              ]}>
              {restaurantResponse ? 'Đã xem xét' : 'Đang chờ phản hồi'}
            </Text>
          </View>
        </View>

        {/* Restaurant Response */}
        {restaurantResponse && (
          <View style={[styles.feedbackCard, styles.responseCard]}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.feedbackAuthor}>Phản hồi từ nhà hàng</Text>
              <Text style={styles.feedbackDate}>
                {formatDate(restaurantResponse.createdAt)}
              </Text>
            </View>
            <Text style={styles.feedbackContent}>
              {restaurantResponse.content}
            </Text>
          </View>
        )}

        {/* Report Button */}
        {canCreateReport && (
          <TouchableOpacity
            style={[
              styles.reportButton,
              userFeedback.admin_check && styles.reportedButton,
            ]}
            onPress={() =>
              handleReport(userFeedback.customer_id, userFeedback.id)
            }
            disabled={userFeedback.admin_check}>
            <MaterialIcons
              name={userFeedback.admin_check ? 'check-circle' : 'flag'}
              size={16}
              color={userFeedback.admin_check ? '#059669' : '#FF3B30'}
            />
            <Text
              style={[
                styles.reportButtonText,
                userFeedback.admin_check && styles.reportedButtonText,
              ]}>
              {userFeedback.admin_check
                ? 'Đã báo cáo với Admin'
                : 'Báo cáo với Admin'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        {/* Order ID */}
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Mã đơn: {order.id}</Text>
          <Text style={styles.orderTime}>{formatDate(order.order_date)}</Text>
        </View>

        {/* Driver Information */}
        {order.Driver && (
          <View style={styles.driverInfoContainer}>
            <View style={styles.driverDetails}>
              <Image
                source={{
                  uri: order.Driver.Profile.image,
                }}
                defaultSource={require('../../assets/Images/driver.png')}
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
                  <Text style={styles.licensePlate}>
                    {order.Driver.car_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Restaurant Information */}
        {order.Restaurant && (
          <View style={styles.restaurantContainer}>
            <View style={styles.restaurantHeader}>
              <Image
                source={{ uri: order.Restaurant?.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>
                  {order.Restaurant?.name}
                </Text>
                <View style={styles.statusContainer}>
                  <MaterialIcons name="access-time" size={16} color="#666" />
                  <Text
                    style={[
                      styles.statusText,
                      { color: isOpen ? '#059669' : '#dc2626' },
                    ]}>
                    {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.addressContainer}>
              <MaterialIcons name="place" size={16} color="#666" />
              <Text style={styles.addressText}>
                {order.Restaurant?.address}
              </Text>
            </View>
            {schedule && (
              <View style={styles.scheduleContainer}>
                <MaterialIcons name="schedule" size={16} color="#666" />
                <Text style={styles.scheduleText}>
                  Giờ mở cửa: {schedule.open} - {schedule.close}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.phoneContainer}>
              <MaterialIcons name="phone" size={16} color="#007AFF" />
              <Text style={styles.phoneText}>
                {order.Restaurant?.phone_number}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {renderFeedbackSection()}
        {/* Ordered Items */}
        {order.listCartItem &&
          order.listCartItem.map((item, index) => (
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
            <Text style={styles.label}>Phí giao hàng</Text>
            <Text style={styles.value}>{formatPrice(order.delivery_fee)}</Text>
          </View>

          {/* Coupons - Fixed implementation */}
          {Array.isArray(order.coupon) && order.coupon.length > 0 && (
            <View style={styles.couponsSection}>
              {order.coupon.map((coupon, index) => (
                <View key={index} style={styles.couponContainer}>
                  <View style={styles.couponRow}>
                    <View style={styles.couponLeft}>
                      <MaterialIcons
                        name="local-offer"
                        size={16}
                        color="#FF3B30"
                      />
                      <Text style={styles.couponText}>
                        {coupon.coupon_name} ({coupon.coupon_code})
                      </Text>
                    </View>
                    <Text style={styles.discountValue}>
                      {coupon.discount_type === 'PERCENTAGE'
                        ? `-${coupon.discount_value}%`
                        : `-${formatPrice(coupon.discount_value)}`}
                    </Text>
                  </View>
                  <Text style={styles.couponInfo}>
                    {`Áp dụng cho đơn từ ${formatPrice(
                      coupon.min_order_value
                    )}`}
                    {coupon.max_discount_amount &&
                      `, tối đa ${formatPrice(coupon.max_discount_amount)}`}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.orderTotal}>{formatPrice(order.price)}</Text>
          </View>
        </View>
      </ScrollView>
      {/* Feedback Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Phản hồi đơn hàng</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.feedbackInput}
              placeholder="Nhập phản hồi của bạn..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitFeedback}
              activeOpacity={0.85}>
              <Text style={styles.submitButtonText}>Gửi phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {order.order_status === 'ORDER_CONFIRMED' && !existingFeedback && (
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={handleFeedback}>
          <MaterialIcons name="feedback" size={24} color="#fff" />
          <Text style={styles.feedbackButtonText}>Phản hồi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderDetailScreen;
