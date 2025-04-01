import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        fontWeight: '500',
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