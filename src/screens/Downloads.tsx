import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Title from '../components/Title';
import Header from '../components/Header';
import colors from '../globals/colors';
import { useDataContext } from '../contexts/DataContext';
import DownloadType from '../types/DownloadType';
import DownloadCard from '../components/DownloadCard';
import Marker from '../components/Marker';

export default function Downloads() {
    const { downloadList } = useDataContext();
    const [option, setOption] = useState('to-listen');

    const navigationList = [
        { option: 'to-listen', label: 'Não escutados' },
        { option: 'listened', label: 'Escutados' },
    ];

    const optionElements = navigationList.map(e => {
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

    const renderItem = ({ item }: { item: DownloadType }) => (
        <DownloadCard
            download={item}
        />
    );

    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Downloads'
                icon={
                    <Feather name="download" size={20} color={colors.title} />
                }
            />

            <View style={styles.optionContainer}>
                {optionElements}
            </View>

            <FlatList
                data={downloadList}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.title}${index}`}
                initialNumToRender={7}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    option: {
        flex: 1,
        alignItems: 'center',
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
});