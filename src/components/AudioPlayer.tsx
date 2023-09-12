import { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    PanResponder,
    PanResponderGestureState,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { usePlayerContext } from '../contexts/PlayerContext';
import colors from '../globals/colors';

export default function AudioPlayer() {
    const {
        playSound,
        pauseSound,
        sound,
        isPlaying,
        barWidth,
        currentPlaying,
        currentTime,
        dotPosition,
        duration,
        increment,
        isAudioPlaying,
        setDotPosition,
        setBarWidth,
        setIsAudioPlaying,
        episode,
    } = usePlayerContext();
    
    const [notification, setNotification] = useState(false);

    const barRef = useRef<View | null>(null);

    const episodeStatus = currentPlaying === episode!.url;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlerDot,
    });

    async function handlerDot(_: any, gestureState: PanResponderGestureState) {
        if (!sound) return;
        const newPosition = gestureState.moveX;
        if (newPosition > barWidth) return;
        if (newPosition < 0) {
            setDotPosition(0);
            sound.setPositionAsync(0);
            return;
        }

        setDotPosition(newPosition);
        const status: any = await sound!.getStatusAsync();
        sound.setPositionAsync((dotPosition / increment) * 1000);
    }

    function handlerPlaySound() {
        setIsAudioPlaying(true);
        playSound();
        setNotification(true);
    }

    function handlerPauseSound() {
        setIsAudioPlaying(false);
        pauseSound();
        setNotification(false);
    }

    async function goRewind() {
        if (!sound) return;
        const status: any = await sound!.getStatusAsync();
        sound.setPositionAsync(status.positionMillis - 15000);
    }

    async function goFoward() {
        if (!sound) return;
        const status: any = await sound!.getStatusAsync();
        sound.setPositionAsync(status.positionMillis + 15000);
    }

    useEffect(() => {
        function getBarWidth() {
            barRef.current?.measure((x, y, width, height, pageX, pageY) => {
                setBarWidth(width);
            });
        }

        getBarWidth();
    }, []);

    return (
        <View style={styles.container}>
            <View
                {...panResponder.panHandlers}
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
                    <View
                        style={{
                            ...styles.dot,
                            left: dotPosition,
                        }}
                    ></View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>{episodeStatus ? currentTime : "00:00"}</Text>
                    <Text style={styles.subtitle}>{episodeStatus ? duration : "10:00"}</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={goRewind}>
                    <MaterialCommunityIcons name="rewind-15" size={32} color={colors.disable} />
                </TouchableOpacity>
                {episodeStatus && isAudioPlaying && isPlaying ? (
                    <Pressable onPress={handlerPauseSound}>
                        <Ionicons name="ios-pause-circle-sharp" size={64} color="#D9D9D9" />
                    </Pressable>
                ) : (
                    <Pressable onPress={handlerPlaySound}>
                        <Ionicons name="play-circle-sharp" size={64} color="#D9D9D9" />
                    </Pressable>
                )}
                <TouchableOpacity onPress={goFoward}>
                    <MaterialCommunityIcons name="fast-forward-15" size={32} color={colors.disable} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    seekBarContainer: {
        width: '100%',
        paddingHorizontal: 20,
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
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 12,
        color: colors.disable,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})