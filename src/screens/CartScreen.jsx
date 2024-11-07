import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ItemInCart from '../components/ItemInCart'
import { Dropdown } from 'react-native-element-dropdown';

import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import CompleteOrder from './CompleteOrderScreen';
import Headerbar from '../components/Headerbar';
import { useSelector } from 'react-redux';
import formatPrice from '../utils/formatPrice';

const CartScreen = () => {
    const route = useRoute();
    const { restaurantId } = route.params;
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [showCompleteOrder, setShowCompleteOrder] = useState(false);
    const items = useSelector(state => state.cart.carts[restaurantId]);
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(500)).current;
    const [foodData, setFoodData] = useState(() => {
        if (items)
            return items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                uniqueId: item.uniqueId
            }));
    });
    useEffect(() => {
        if (items) {
            setFoodData(items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
                toppings: item.toppings,
                uniqueId: item.uniqueId
            })));
        }
    }, [items]);
    const sum = useSelector(state => state.cart.totalAmount[restaurantId].amount);
    useEffect(() => {
        const animation = Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        });

        animation.start();

        // Clean up the animation
        return () => animation.stop();
    }, [slideAnim]);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowCompleteOrder(false);
        });

        return unsubscribe; // Clean up listener khi component bị unmount
    }, [navigation]);

    const CompleteOrderDisplay = () => (
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
            <CompleteOrder onComplete={() => setShowCompleteOrder(false)} />
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headContainer}>
                <Headerbar />
            </View>
            <View style={styles.mainContainer}>
                {items && items.length > 0 ? (
                    <ScrollView style={styles.scrollContainer}>
                        {foodData.map((food) => {
                            return <ItemInCart food={food} key={food.uniqueId} restaurantId={restaurantId} />
                        })}
                    </ScrollView>
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Your cart is empty</Text>
                )}
                <View style={styles.noteContainer}>
                    <TextInput placeholder='Ghi chú' style={styles.rowfdsds}></TextInput>
                </View>
                <View style={styles.summaryContainer}>
                    <Text style={styles.textBold}>Chi tiết thanh toán</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tạm tính</Text>
                        <Text style={styles.value}>{formatPrice(sum)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phí áp dụng</Text>
                        <Text style={styles.value}>{formatPrice(sum * 0.1)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Giảm giá</Text>
                        <Text style={styles.value}>{formatPrice(0)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={[styles.row, { borderBlockColor: '#FFFFFF', borderBottomWidth: 1 }]}>
                    <Text style={[styles.label, styles.totalLabel]}>Tổng số tiền</Text>
                    <Text style={[styles.value, styles.totalValue]}>{formatPrice(sum)}</Text>
                </View>
                <View style={styles.methodPaymentContainer}>
                    <View style={styles.payment}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select payment method"
                            searchPlaceholder="Search..."
                            value={paymentMethod}
                            onChange={item => {
                                setPaymentMethod(item.value);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                        />
                    </View>
                    <View style={styles.discount}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select discount"
                            value={discount}
                            onChange={item => {
                                setDiscount(item.value);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => setShowCompleteOrder(true)}>
                    <Text style={styles.buttonText}>Đặt món</Text>
                </TouchableOpacity>
            </View>

            {showCompleteOrder && (
                <>
                    <BlurView
                        style={styles.absolute}
                        blurType="light"
                        blurAmount={1}
                        reducedTransparencyFallbackColor="white"
                    />
                    <CompleteOrderDisplay />
                </>
            )}
        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headContainer: {
        margin: 5
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    scrollContainer: {
        height: 200
    },
    footerContainer: {
        backgroundColor: '#FF0000',
        borderRadius: 20,
        padding: 20,
        margin: 10,
    },
    summaryContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    label: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    value: {
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FF3D00',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBold: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    methodPaymentContainer: {
        flexDirection: 'row'
    },
    payment: {
        width: '50%',
        borderRightWidth: 1
    },
    discount: {
        width: '50%'
    },
    locationContainer: {
        elevation: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 60,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 10
    },
    noteContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        paddingLeft: 10,
        margin: 10,
        elevation: 10,
    },

    dropdown: {
        margin: 10,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        backgroundColor: '#FFF'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    card: {
        flex: 1,
        top: "65%",
        position: 'absolute',
        left: 0,
        right: 0,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
