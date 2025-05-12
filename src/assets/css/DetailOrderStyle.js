import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  orderIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
  },
  driverInfoContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  driverBike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  licensePlate: {
    fontSize: 14,
    color: '#666',
  },
  restaurantContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 4,
    fontSize: 14,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  addressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
  },
  orderItemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderItemDetails: {
    flexDirection: 'row',
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  orderItemText: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  orderItemOption: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  noteContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  orderLable: {
    fontSize: 16,
    color: '#666',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3b30',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 4,
  },

  // Improved coupon section styles
  couponsSection: {
    marginBottom: 12,
  },
  couponContainer: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  couponText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  discountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  couponInfo: {
    fontSize: 12,
    color: '#666',
    marginLeft: 24,
    fontStyle: 'italic',
  },
  couponValidity: {
    fontSize: 11,
    color: '#888',
    marginLeft: 24,
    marginTop: 4,
  },

  //modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
    minHeight: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
  },
  closeButton: {
    padding: 6,
  },
  feedbackInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    height: 160,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  // Existing Feedback Container
  feedbackSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  feedbackSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  feedbackCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  responseCard: {
    backgroundColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackAuthor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  feedbackDate: {
    fontSize: 12,
    color: '#64748b',
  },
  feedbackContent: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  feedbackStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f2',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  reportButtonText: {
    color: '#FF3B30',
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  reportedButton: {
    backgroundColor: '#ecfdf5',
    opacity: 0.8,
  },
  reportedButtonText: {
    color: '#059669',
  },
});

export default styles;
