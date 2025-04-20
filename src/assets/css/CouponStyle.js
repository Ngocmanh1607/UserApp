import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  couponList: {
    padding: 10,
  },
  couponCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  couponTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
    flex: 1,
  },
  couponCode: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 6,
  },
  minOrder: {
    fontSize: 13,
    color: '#777',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Information row to display multiple data points in one line
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
  },
  // Compact badge for coupon status
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#e8f5e9',
    marginLeft: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  // Compact footer with actions
  couponFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  expiryText: {
    fontSize: 11,
    color: '#999',
  },
  // Grid layout for two columns
  couponGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 30) / 2,
    marginBottom: 10,
  },
  // Filter chips
  filterChips: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  filterChip: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: '#FFE5E5',
  },
  filterChipText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  filterChipTextActive: {
    color: '#FF3B30',
  },
});

export default styles;
