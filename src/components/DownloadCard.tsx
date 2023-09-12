import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DownloadType from '../types/DownloadType';
import { useDataContext } from '../contexts/DataContext';

interface Props {
    download: DownloadType;
}

export default function UpdateCard(props: Props) {
    const { podcast } = useDataContext();
    const currentEpisode = podcast?.episodes.find(e => e.title === props.download.title);

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: currentEpisode?.image,
                }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{props.download.title}</Text>
                <Text style={styles.subtitle}>{new Date(currentEpisode!.pubDate).toLocaleDateString()}</Text>
            </View>

            <TouchableOpacity>
                <Feather name="trash-2" size={18} color="#717171" />
            </TouchableOpacity>
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
    info: {
        width: Dimensions.get('window').width * 0.65,
    },
    title: {
        fontFamily: 'Inter500',
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'Inter400',
        color: '#fff',
        fontSize: 12,
    },
    image: {
        resizeMode: 'contain',
        width: 42,
        height: 42,
        borderRadius: 72,
    },
});