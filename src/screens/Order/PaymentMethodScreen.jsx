import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/css/PaymentMethodStyle';
import Icon from 'react-native-vector-icons/Ionicons';
const PaymentMethodScreen = ({ onSelectMethod, onClose }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Ví điện tử</Text>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => onSelectMethod('ZALOPAY')}>
        <Image
          source={require('../../assets/Images/zalo.png')}
          style={styles.image}
        />
        <Text>Zalopay</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => onSelectMethod('MoMo')}>
        <Image
          source={require('../../assets/Images/momo.png')}
          style={styles.image}
        />
        <Text>MoMo</Text>
      </TouchableOpacity> */}

      <Text style={styles.sectionTitle}>Phương thức thanh toán khác</Text>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => onSelectMethod('COD')}>
        <Image
          source={require('../../assets/Images/money.jpeg')}
          style={styles.image}
        />
        <Text>Tiền mặt</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;
