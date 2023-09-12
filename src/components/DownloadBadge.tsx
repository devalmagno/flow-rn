import { useState, useEffect } from 'react';
import { View } from 'react-native';

import DownloadButton from './DownloadButton';
import DownloadDone from './DownloadDone';

import EpisodeType from '../types/EpisodeType';
import { useDataContext } from '../contexts/DataContext';

interface Props {
    episode: EpisodeType;
}

export default function DownloadBadge({ episode }: Props) {
    const { downloadList } = useDataContext();
    const [status, setStatus] = useState('downloadable');

    useEffect(() => {
        function getStatus() {
            if (downloadList.some(e => e.title === episode.title)) setStatus('downloaded');
        }

        getStatus();
    }, []);

    return (
        <View>
            {
                status === 'downloadable' ?
                    <DownloadButton
                        episode={episode}
                    /> :
                    <DownloadDone 
                        episode={episode}
                    />
            }
        </View>
    );
}