import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#f00" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Màu nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
});
