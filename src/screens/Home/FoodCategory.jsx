import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
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
            try {
                setIsLoading(true);
                const data = await foodApi.getFoodInCate(categoryId);
                console.log(data);
                if (data && Array.isArray(data) && data.length > 0) {
                    setFoodData(data);
                    setIsNull(false);
                } else {
                    setIsNull(true);
                }
            } catch (error) {
                console.error(error);
                setFoodData([]);
                setIsNull(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFoodInCategory();
    }, [categoryId]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : foodData.length > 0 ? (
                <ScrollView style={styles.scrollContainer}>
                    {foodData.map((food) => (
                        <CardFoodInCate food={food} key={food.productId} />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.containerText}>
                    <Text style={styles.text}>Chưa có món nào trong danh mục này</Text>
                </View>
            )}
        </View>
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