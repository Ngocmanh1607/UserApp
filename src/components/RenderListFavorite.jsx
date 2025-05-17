import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import CardResFavo from './CardResFavo';
import userApi from '../api/userApi';
const RenderListFavorite = () => {
  const [listFavorite, setListFavorite] = useState();
  useEffect(() => {
    const fetchLisFavorite = async () => {
      try {
        const response = await userApi.getListFavoRes();
        setListFavorite(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLisFavorite();
  }, []);
  if (!listFavorite || listFavorite.length === 0) {
    return null;
  }
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nhà hàng bạn yêu thích</Text>
      </View>
      <FlatList
        horizontal={true}
        data={listFavorite}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardResFavo restaurant={item} />}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Bạn chưa có nhà hàng yêu thích nào
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(RenderListFavorite);

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 8,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
