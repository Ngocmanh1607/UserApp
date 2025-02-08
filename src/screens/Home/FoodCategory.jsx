import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { foodApi } from '../../api/foodApi';
import CardFoodInCate from '../../components/CardFoodInCate';

const FoodCategory = ({ route }) => {
    const { categoryId } = route.params;
    const [isLoading, setIsLoading] = useState(false);
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
        <ScrollView style={styles.container}>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <Text>Đang tải...</Text>
                </View>
            )}
            {!isLoading && foodData.length > 0 && (
                foodData.map((food) => <CardFoodInCate food={food} key={food.productId} />)
            )}
            {!isLoading && isNull && (
                <View style={styles.containerText}>
                    <Text>Chưa có món nào trong danh mục này</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default FoodCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerText: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
