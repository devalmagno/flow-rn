import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

export default function HistoryCard() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/perfil.jpg')}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>Tarja Preta FM</Text>
                <Text style={styles.subtitle}>#52 - Tarja Preta FM</Text>
            </View>

            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderRadius: 8,
    },
    info: {},
    title: {
        fontFamily: 'Inter500',
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Inter400',
        color: '#fff',
    },
    image: {
        resizeMode: 'contain',
        width: 64,
        height: 64,
        borderRadius: 72,
    },
});