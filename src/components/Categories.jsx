import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { foodApi } from '../api/foodApi';
import FoodCard from './CardFood';

const Categories = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isNull, setIsNull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [foodData, setFoodData] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const data = await foodApi.getCategories();
                if (data && Array.isArray(data)) {
                    const filteredCategories = data.map(category => ({
                        id: category.id,
                        name: category.name
                    }));
                    setCategories(filteredCategories);

                    if (filteredCategories.length > 0) {
                        await fetchFoodInCategory(filteredCategories[0].id);
                    }
                } else {
                }
            } catch (error) {
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const fetchFoodInCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            const data = await foodApi.getFoodInCate(categoryId);
            console.log(data)
            if (data && Array.isArray(data) && data.length > 0) {
                setFoodData(data);
                setIsNull(data.length === 0);
            }
            else {
                setIsNull(true)
            }
        } catch (error) {
            setFoodData([]);
            setIsNull(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryPress = useCallback((index, categoryId) => {
        console.log("Category pressed:", { index, categoryId });
        setSelectedIndex(index);
        fetchFoodInCategory(categoryId);
    }, []);
    const LoadingSpinner = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.box,
                            { backgroundColor: selectedIndex === index ? '#FF0000' : '#ffffff' }
                        ]}
                        onPress={() => handleCategoryPress(index, category.id)}
                    >
                        <Image
                            source={require('../assets/Images/icon_2.png')}
                            style={styles.image}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: selectedIndex === index ? '#ffffff' : '#000000' }
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {isLoading ? (
                <LoadingSpinner />
            ) : !isNull ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.foodScrollView}
                >
                    {foodData.map(food => (
                        <FoodCard key={food.productId} food={food} />
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noDataText}>
                    Chưa có món ăn nào trong category này
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        elevation: 5
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center'
    },
    image: {
        width: 25,
        height: 25,
        marginBottom: 5
    },
    box: {
        flexDirection: 'column',
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    text: {
        marginLeft: 10,
        fontSize: 12,
        fontWeight: '500',
    },
    scrollContainer: {
        paddingHorizontal: 5,
    },
    foodScrollView: {
        marginTop: 10,
        marginLeft: 10
    },
    noDataText: {
        textAlign: 'center',
        margin: 10,
        fontSize: 14,
        color: '#999'
    }
});

export default Categories;