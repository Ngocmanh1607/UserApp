import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    headContainer: {
        margin: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    textHeader: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    scrollContainer: {
        height: 270,
        marginVertical: 5,
    },
    subContainer: {
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    summaryContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 5,
        padding: 10,
        elevation: 10,
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
        color: "#FFF",
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBold: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    methodPaymentContainer: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        padding: 10,
        marginTop: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        padding: 10,
    },
    noteContainer: {
        backgroundColor: '#FFFF',
        borderRadius: 5,
        paddingLeft: 10,
        elevation: 10,
        height: 40
    },

    dropdown: {
        margin: 5,
        height: 40,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
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
    text: {
        paddingRight: 10,
        width: 340,
    },
    paymentText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    discountText: {
        fontSize: 16,
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    couponContainer: {
        backgroundColor: '#FFF',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        height: 40,
        padding: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // Mờ nền
        justifyContent: "center",
        alignItems: "center",
    },
});
export default styles;
