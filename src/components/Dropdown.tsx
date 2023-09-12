import { useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDataContext } from '../contexts/DataContext';
import colors from '../globals/colors';

export default function Dropdown() {
    const { setIsFiltering } = useDataContext();
    const [filter, setFilter] = useState('Novos');

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => { setIsFiltering(true) }}
        >
            <Ionicons name="filter" size={16} color={colors.title} style={{ marginRight: 4, }} />
            <Text style={styles.title}>Filtrar por: </Text>
            <Text style={styles.subtitle}>{filter}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 8,
        backgroundColor: colors.card,
        borderRadius: 4,
    },
    title: {
        fontFamily: 'Inter500',
        fontSize: 15,
        color: colors.title,
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 15,
        color: colors.title,
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        height: 164,
        width: '100%',
        backgroundColor: colors.card
    }
});
