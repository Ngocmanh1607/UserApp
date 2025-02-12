import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 20,
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 2,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 10,
        paddingHorizontal: 30,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    skipButton: {
        flex: 1,
    },
    skipText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        width: "30%",
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});
export default styles;