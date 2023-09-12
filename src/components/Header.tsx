import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        height: 88,
    },
    logo: {
        width: 110,
        height: 56,
        resizeMode: 'contain',
    },
})