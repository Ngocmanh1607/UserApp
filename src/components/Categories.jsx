import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { foodApi } from '../api/foodApi';
import FoodCard from './CardFood';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const data = await foodApi.getCategories();
      setIsLoading(false);
      if (data.success && data.data && Array.isArray(data.data)) {
        const filteredCategories = data.data.map((category) => ({
          id: category.id,
          name: category.name,
          icon: category.thumnail,
        }));
        setCategories(filteredCategories);
      } else {
        Alert.alert('Đã xảy ra lỗi', data.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (categoryId) => {
    navigation.navigate('FoodCategory', { categoryId });
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={styles.box}
            onPress={() => handleCategoryPress(category.id)}>
            <Image source={{ uri: category.icon }} style={styles.image} />
            <Text style={styles.text}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    // backgroundColor: "#adadac"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  box: {
    width: 100,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 0,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: '#f3f3f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  foodScrollView: {
    marginTop: 10,
    marginLeft: 10,
  },
  noDataText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 14,
    color: '#999',
  },
});

export default Categories;
