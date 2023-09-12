import { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import EpisodeCard from '../components/EpisodeCard';
import EpisodeType from '../types/EpisodeType';
import { useDataContext } from '../contexts/DataContext';
import Dropdown from '../components/Dropdown';
import colors from '../globals/colors';
import ScreenLoading from './ScreenLoading';

export default function PodcastScreen() {
    const { filteredPodcast, podcast } = useDataContext();

    const renderItem = ({ item }: { item: EpisodeType }) => (
        <EpisodeCard
            episode={item}
            image={item.image}
            title={item.title}
        />
    );

    if (!podcast || !filteredPodcast) return <ScreenLoading />;
    return (
        <View style={styles.container}>
            <FlatList
                style={{
                    paddingHorizontal: 24,
                }}
                ListHeaderComponentStyle={styles.header}
                ListHeaderComponent={() => (
                    <View style={{ gap: 8 }}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{podcast!.title}</Text>
                        <View style={styles.row}>
                            <Feather name="users" size={16} color={colors.title} />
                            <Text style={styles.subtitle}>Apresentado por:</Text>
                            <Text style={{ ...styles.subtitle, fontFamily: 'Inter500' }}>
                                {podcast!.copyright}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Feather name="headphones" size={16} color={colors.title} />
                            <Text style={styles.subtitle}>{podcast!.episodes!.length} episódios</Text>
                        </View>
                        <Text style={styles.subtitle}>
                            {podcast!.description}
                        </Text>
                        <View>

                            <Dropdown />
                        </View>
                    </View>
                )}
                data={filteredPodcast!.episodes}
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
        backgroundColor: colors.background,
    },
    header: {
        marginTop: 64,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins600',
        fontSize: 18,
        color: colors.title,
    },
    image: {
        width: '100%',
        height: 132,
        borderRadius: 4,
        objectFit: 'contain',
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 15,
        color: colors.subtitle,
    },
});