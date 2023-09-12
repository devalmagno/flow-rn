import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useDataContext } from '../contexts/DataContext';
import colors from '../globals/colors';
import { useState } from 'react';
import Marker from './Marker';

export default function Menu() {
    const { isFiltering, setIsFiltering } = useDataContext();
    const [option, setOption] = useState('filter');

    const optionList = [
        { option: 'filter', label: 'Filtrar' },
        { option: 'order by', label: 'Ordenar' },
    ];

    const filterList = [
        { option: 'download', label: 'Disponível offline' },
        { option: 'unheard', label: 'Não escutado' },
        { option: 'favorite', label: 'Favorito' },
    ];

    const orderByList = [
        { option: 'new', label: 'Novos' },
    ];

    const optionElements = optionList.map(e => {
        const isSelected = e.option === option;

        return (
            <TouchableOpacity
                key={e.option}
                style={isSelected ? { ...styles.option, ...styles.optionSelected } : styles.option}
                onPress={() => { setOption(e.option) }}
            >
                <Text style={isSelected ? { ...styles.title, color: colors.primary } : styles.title}>{e.label}</Text>
            </TouchableOpacity>
        );
    });

    const filterElements = filterList.map(e => {
        return <Marker key={e.option} label={e.label} option={e.option} />
    });

    const orderByElements = orderByList.map(e => {
        return <Marker key={e.option} label={e.label} option={e.option} />
    })

    return (
        <Pressable
            style={isFiltering ? styles.container : { display: 'none' }}
            onPress={() => { setIsFiltering(false) }}
        >
            <View style={styles.menu}>
                <View style={styles.optionContainer}>
                    {optionElements}
                </View>
                <View style={styles.items}>
                    {option === 'filter' ? filterElements : orderByElements}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: "#00000099"
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 8,
        backgroundColor: colors.card,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    optionSelected: {
        borderColor: colors.primary,
        borderBottomWidth: 3,
    },
    title: {
        fontFamily: 'Poppins500',
        fontSize: 15,
        color: colors.disable,
    },
    items: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
})