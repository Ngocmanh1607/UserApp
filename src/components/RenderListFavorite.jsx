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
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});
