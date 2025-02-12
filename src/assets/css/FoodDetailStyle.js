import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: '30%',
    },
    mainContainer: {
        position: 'absolute',
        zIndex: 1,
        width: '95%',
        height: '90%',
        top: 180,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    textName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
    },
    textPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    toppingContainer: {
        margin: 20,
    },
    toppingTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    toppingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    toppingName: {
        fontSize: 16,
        flex: 1,
        color: '#000000',
    },
    toppingPrice: {
        fontSize: 16,
        marginRight: 10,
        color: '#000000',
    },
    cardBottom: {
        flex: 1,
        width: '100%',
        height: "30%",
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 1,
        padding: 10,
        zIndex: 1,
    },
    bottomContainer: {
        flex: 1,
        width: '100%',
        margin: 20,
        flexDirection: 'column',
    },
    mainBContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },
    buttonContainer: {
        backgroundColor: "#FF0000",
        width: '80%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        marginBottom: 10,
    },
    textAdd: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    addButton: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        padding: 8,
        margin: 10,
    },
    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
});
export default styles;