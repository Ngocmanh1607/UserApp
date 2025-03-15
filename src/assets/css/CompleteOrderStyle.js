import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 5,
        marginBottom: 20,
        padding: 15,
        bottom: 0,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    iconWrapper: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30
    },
    icon: {
        backgroundColor: '#FFEB3B',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3
    },
    iconText: {
        fontSize: 32,
        color: '#FF0000',
    },
    thankYouText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000',
        marginVertical: 15,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
        lineHeight: 22
    },
    trackOrderButton: {
        backgroundColor: '#FF0000',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 30,
        marginHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default styles;