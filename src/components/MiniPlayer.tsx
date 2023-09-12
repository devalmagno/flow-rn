import { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { usePlayerContext } from '../contexts/PlayerContext';
import colors from '../globals/colors';

export default function MiniPlayer() {
    const {
        sound,
        isPlaying,
        image,
        playSound,
        pauseSound,
        currentTime,
        dotPosition,
        duration,
        setBarWidth,
        setIsAudioPlaying
    } = usePlayerContext();

    const barRef = useRef<View | null>(null);

    const route = useRoute();
    const navigation = useNavigation();
    const customStyle = route.name === 'PodcastScreen' ? { ...styles.container, bottom: 0, backgroundColor: "#000", } : styles.container;

    function handlerPlaySound() {
        playSound();
        setIsAudioPlaying(true);
    }

    function handlerPauseSound() {
        pauseSound();
        setIsAudioPlaying(false);
    }

    useEffect(() => {
        function getBarWidth() {
            barRef.current?.measure((x, y, width, height, pageX, pageY) => {
                setBarWidth(width);
            });
        }

        getBarWidth();
    }, []);

    if (!sound) return <View style={styles.hide}></View>
    return (
        <View style={customStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Player' as never)}>
                <Image
                    source={{
                        uri: image,
                    }}
                    style={styles.image}
                />
            </TouchableOpacity>
            {isPlaying ? (
                <Pressable onPress={handlerPauseSound}>
                    <Ionicons name="ios-pause-circle-sharp" size={48} color="#D9D9D9" />
                </Pressable>
            ) : (
                <Pressable onPress={handlerPlaySound}>
                    <Ionicons name="play-circle-sharp" size={48} color="#D9D9D9" />
                </Pressable>
            )}

            <View
                style={styles.seekBarContainer}
            >
                <View
                    style={styles.seekBar}
                >
                    <View ref={barRef} style={styles.bar}></View>
                    <View
                        style={{
                            ...styles.progress,
                            width: dotPosition,
                        }}
                    ></View>
                    <Pressable
                        style={{
                            ...styles.dot,
                            left: dotPosition,
                        }}
                    ></Pressable>
                </View>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>{currentTime}</Text>
                    <Text style={styles.subtitle}>{duration}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    hide: {
        display: "none",
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 72,
        width: '100%',
        backgroundColor: "#000",
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 60,
    },
    image: {
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    seekBarContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        paddingRight: 12,
    },
    seekBar: {
        width: '100%',
        position: 'relative',
        marginBottom: 8,
    },
    bar: {
        width: '100%',
        height: 3,
        backgroundColor: colors.disable,
        borderRadius: 8,
    },
    progress: {
        height: 3.5,
        backgroundColor: colors.title,
        borderRadiusTopLeft: 8,
        borderRadiusBottomLeft: 8,
        position: 'absolute',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.title,
        position: 'absolute',
        left: '49%',
        top: -2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 12,
        color: colors.disable,
    },
});