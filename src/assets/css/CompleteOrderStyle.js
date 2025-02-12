import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 5,
        marginBottom: 20
    },
    iconWrapper: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    icon: {
        backgroundColor: '#FFEB3B',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 30,
        color: '#FF0000',
    },
    thankYouText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF0000',
        marginVertical: 10,
    },
    subText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 10,
    },
    trackOrderButton: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
export default styles;