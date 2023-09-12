import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { usePlayerContext } from '../contexts/PlayerContext';

import EpisodeType from '../types/EpisodeType';
import colors from '../globals/colors';
import DownloadBadge from './DownloadBadge';
import { useDataContext } from '../contexts/DataContext';

interface Props {
    episode: EpisodeType;
    image: string;
    title: string;
}

export default function EpisodeCard(props: Props) {
    const { setEpisode, setTitle, setImage, episode } = usePlayerContext();
    const { downloadList } = useDataContext();

    const navigation = useNavigation();

    function handlerNavigation() {
        const isDownloaded = downloadList.some(e => e.title === props.episode.title);
        const url = isDownloaded ? downloadList.find(e => e.title === props.episode.title)?.url : props.episode.url;
        const newEpisode = {
            ...props.episode,
            url: url!,
        }

        if (episode !== props.episode) {
            setEpisode(newEpisode);
            setTitle(props.title);
            setImage(props.image);
        }

        navigation.navigate('Player' as never);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.column} onPress={handlerNavigation}>
                <Text style={styles.title}>{props.episode.title}</Text>
                <View style={styles.row}>
                    <Image
                        source={{
                            uri: props.image,
                        }}
                        style={styles.image}
                    />

                    <View style={styles.column}>
                        <Text style={styles.subtitle}>
                            {props.episode.content}
                        </Text>
                        <View style={styles.row}>
                            <Feather name="calendar" size={16} color="#fff" />
                            <Text style={styles.subtitle}>{new Date(props.episode.pubDate).toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <DownloadBadge episode={props.episode}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.card,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 10,
        overflow: 'hidden',
    },
    info: {},
    column: {
        gap: 4,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontFamily: 'Poppins500',
        color: colors.title,
        fontSize: 13,
        maxHeight: 13,
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 12,
        color: colors.subtitle,
        maxHeight: 40,
        maxWidth: 234,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        width: 72,
        height: 72,
        borderRadius: 4,
        backgroundColor: '#F0F0F0',
    },
})