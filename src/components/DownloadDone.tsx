import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import EpisodeType from '../types/EpisodeType';
import colors from '../globals/colors';

interface Props {
    episode: EpisodeType;
}

export default function DownloadDone({ episode }: Props) {
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <Feather name="check" size={20} color={colors.card} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        width: 20,
        borderRadius: 24,
        backgroundColor: colors.primary,
    },
});