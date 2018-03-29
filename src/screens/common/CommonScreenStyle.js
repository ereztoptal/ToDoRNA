import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        backgroundColor: '#ffffff',
    },
    title:{
        textAlign: 'center',
        fontSize: 26,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    error: {
        flex: 1,
        justifyContent: 'center'
    },
    errorText:{
        color: 'red'
    }
});

export default commonStyles;