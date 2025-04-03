import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    position: 'relative',
  },
  headContainer: {
    marginTop: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
    shadowColor: '#e74c3c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  methodPaymentContainer: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  noteContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 3,
    height: 56,
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  footer: {
    paddingBottom: 50,
  },
  dropdown: {
    margin: 8,
    height: 48,
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    paddingRight: 15,
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
    marginRight: 6,
  },
  image: {
    width: 28,
    height: 28,
    marginRight: 12,
    borderRadius: 6,
  },
  couponContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    height: 60,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    marginBottom: 180,
  },
  divider: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: 18,
    color: '#2c3e50',
  },
  totalValue: {
    fontWeight: '700',
    fontSize: 20,
    color: '#e74c3c',
  },

  // Header styles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  addressButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#fef2f2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  addressText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },

  // Note input styles
  noteInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  noteIcon: {
    marginRight: 8,
  },
  noteInput: {
    flex: 1,
    height: 46,
    fontSize: 15,
    color: '#2c3e50',
  },

  // Coupon styles
  couponLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponIcon: {
    marginRight: 8,
  },
  noCouponText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 4,
  },

  // Summary styles
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#34495e',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 15,
    color: '#e74c3c',
    fontWeight: '500',
  },
  totalSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalSummaryLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  totalSummaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e74c3c',
  },
});

export default styles;
