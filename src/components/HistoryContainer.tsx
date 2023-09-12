import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import HistoryCard from './HistoryCard';

export default function HistoryContainer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hoje</Text>
            <HistoryCard />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontFamily: 'Inter600',
        color: '#F4F4F4',
    },
});