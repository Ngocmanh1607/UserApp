import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    orderCompleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
    },
    orderCompleteText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderCompleteSubText: {
        color: '#888',
        marginTop: 5,
    },
    orderCompleteIcon: {
        width: 40,
        height: 40,
    },
    driverInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    licensePlate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    driverImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    driverInfo: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverRating: {
        color: '#888',
    },
    orderItemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    orderItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    orderItemText: {
        flex: 1,
    },
    orderItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderItemOption: {
        color: '#888',
        fontSize: 14,
    },
    orderItemPrice: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    paymentInfoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    paymentMethod: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
    },
    orderIdContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderTime: {
        fontSize: 14,
        color: '#888',
    },
    reorderButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    reorderButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    summaryContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        elevation: 10,
    },
    textBold: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        // height: 40
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
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#FFF"
    },
});
export default styles;