import { Dispatch, SetStateAction, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import colors from '../globals/colors';
import { useDataContext } from '../contexts/DataContext';

interface Props {
    label: string;
    option: string;
}

export default function Marker(props: Props) {
    const { podcast, downloadList, setFilteredPodcast } = useDataContext();
    const [status, setStatus] = useState('unselected');

    const markerElement = handlerMarkerElement();

    function handlerMarkerElement() {
        let content = <View></View>;

        if (status === 'true')
            content = <Feather name="check" size={13} color={colors.card} />;
        else if (status === 'false')
            content = <MaterialIcons name="close" size={13} color={colors.card} />;


        if (status === 'unselected')
            return <TouchableOpacity style={styles.marker} onPress={handlerMarkerEvent}></TouchableOpacity>;
        else
            return (
                <TouchableOpacity style={{ ...styles.marker, ...styles.markerSelected }} onPress={handlerMarkerEvent}>
                    {content}
                </TouchableOpacity>
            )
    }

    function handlerMarkerEvent() {
        if (status === 'unselected') setStatus('true');
        else if (status === 'true') setStatus('false');
        else if (status === 'false') setStatus('unselected');

        if (props.option === 'download') offlineFilter();
    }

    function offlineFilter() {
        const offlineEpisodes = podcast!.episodes.filter(e => {
            if (downloadList.some(elem => elem.title === e.title))
                return e;
        });
        const normalEpisodes = podcast!.episodes.filter(e => {
            if (!downloadList.some(elem => elem.title === e.title))
                return e;
        });

        const episodes = status === 'unselected' ? podcast!.episodes : status === 'true' ? offlineEpisodes : normalEpisodes;

        setFilteredPodcast({...podcast!, episodes});
        setFilteredPodcast(state => ({...state!}));
    }

    return (
        <TouchableOpacity style={styles.container}>
            {markerElement}
            <Text style={styles.subtitle}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        gap: 16,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#D9D9D9',
        borderRadius: 2,
    },
    markerSelected: {
        backgroundColor: colors.primary,
        borderWidth: 0,
    },
    subtitle: {
        fontFamily: 'Inter400',
        color: '#D9D9D9',
    }
});