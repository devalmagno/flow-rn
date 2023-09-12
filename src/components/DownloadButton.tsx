import { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { DownloadProgressData, DownloadResumable, createDownloadResumable, documentDirectory } from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from '../globals/colors';
import EpisodeType from '../types/EpisodeType';
import { useDataContext } from '../contexts/DataContext';

interface Props {
    episode: EpisodeType;
}

export default function DownloadButton({ episode }: Props) {
    const { downloadList, setDownloadList } = useDataContext();
    const [downloadProgress, setDownloadProgress] = useState(0);
    const height = useSharedValue(0);
    const width = useSharedValue(0);

    async function handlePress() {
        handleDownload();
    }

    async function handleDownload() {
        const filename = `${episode.title}.mp3`;

        const callback = (downloadProgress: DownloadProgressData) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress);
        };

        const downloadResumable = createDownloadResumable(
            episode.url,
            `${documentDirectory}${filename}`,
            {},
            callback
        );

        try {
            const { uri }: any = await downloadResumable.downloadAsync();
            const downloads = [...downloadList];
            downloads.push({ title: episode.title, url: uri });
            setDownloadList([...downloads]);
            await AsyncStorage.setItem('downloads', JSON.stringify(downloads));
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }

        try {
            await downloadResumable.pauseAsync();
            console.log('Paused download operation, saving for future retrieval');
            AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
        } catch (e) {
            console.error(e);
        }

        try {
            const { uri }: any = await downloadResumable.resumeAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }

        //To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
        // const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
        // if (downloadSnapshotJson) {
        //     const downloadSnapshot = JSON.parse(downloadSnapshotJson!);
        //     const downloadResumable = new DownloadResumable(
        //         downloadSnapshot.url,
        //         downloadSnapshot.fileUri,
        //         downloadSnapshot.options,
        //         callback,
        //         downloadSnapshot.resumeData
        //     );

        //     try {
        //         const { uri }: any = await downloadResumable.resumeAsync();
        //         console.log('Finished downloading to ', uri);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }
    }



    useEffect(() => {
        function updateDownloadProgress() {
            const currentValue = downloadProgress * 100 * 0.20;
            height.value = withSpring(currentValue);
            width.value = withSpring(currentValue);
        }

        updateDownloadProgress();
    }, [downloadProgress]);

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Feather name="arrow-down-circle" size={20} color={"#717171"} style={{ zIndex: 1 }} />
            <Animated.View
                style={{
                    height,
                    width,
                    backgroundColor: colors.subtitle,
                    ...styles.circle
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        borderRadius: 24,
    }
});