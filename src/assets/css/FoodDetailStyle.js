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
        height: '78%',
        top: 180,
        borderRadius: 20,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    headerContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
    },
    textName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        letterSpacing: 0.5
    },
    textPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF0000',
        letterSpacing: 0.5
    },
    toppingContainer: {
        margin: 25,
        paddingTop: 10
    },
    toppingTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
        color: '#222',
        letterSpacing: 0.5
    },
    toppingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    toppingName: {
        fontSize: 16,
        flex: 1,
        color: '#444',
        letterSpacing: 0.3,
        fontWeight: '500'
    },
    toppingPrice: {
        fontSize: 16,
        marginRight: 15,
        color: '#FF0000',
        fontWeight: '500'
    },
    checkbox: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
        marginRight: 2,
        tintColors: { true: '#FF0000', false: '#999' }
    },
    cardBottom: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: '#FFFFFF',
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
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    textAdd: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
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