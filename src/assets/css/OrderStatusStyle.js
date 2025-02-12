import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        marginTop: 50,
    },
    chefImage: {
        width: 300,
        height: 300,
    },
    map: {
        flex: 2,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInfoContainer: {

        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
        borderWidth: 1
    },
    orderStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    progressItem: {
        alignItems: 'center',
    },
    progressText: {
        marginTop: 5,
        fontSize: 14,
        color: '#9E9E9E',
    },
    activeStep: {
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
    },
    orderDetailsButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    orderDetailsText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
export default styles;