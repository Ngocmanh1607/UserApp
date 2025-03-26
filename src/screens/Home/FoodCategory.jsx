import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { foodApi } from '../../api/foodApi';
import CardFoodInCate from '../../components/CardFoodInCate';
const FoodCategory = ({ route }) => {
    const { categoryId } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
        const fetchFoodInCategory = async () => {
            setIsLoading(true);
            const data = await foodApi.getFoodInCate(categoryId);
            setIsLoading(false);
            if (data.success) {
                setFoodData(data.data.products);
            } else {
                Alert.alert('Lỗi', data.message);
            }
        };
        fetchFoodInCategory();
    }, [categoryId]);
    const renderItem = ({ item }) => {
        return <CardFoodInCate food={item} />;
    }
    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : foodData ? (
                <FlatList
                    data={foodData}
                    renderItem={renderItem}
                    keyExtractor={item => item.productId}
                />
            ) : (
                <View style={styles.containerText}>
                    <Text style={styles.text}>Chưa có món nào trong danh mục này</Text>
                </View>
            )
            }
        </View >
    );
};

export default FoodCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
});