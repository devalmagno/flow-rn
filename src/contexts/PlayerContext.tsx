import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

import { playNotification } from '../utils/notifications';

import EpisodeType from "../types/EpisodeType";

interface PlayerContextType {
    sound: Audio.Sound | null;

    episode: EpisodeType | null;
    setEpisode: Dispatch<SetStateAction<EpisodeType | null>>;

    image: string;
    setImage: Dispatch<SetStateAction<string>>;

    title: string;
    setTitle: Dispatch<SetStateAction<string>>;

    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;

    playSound: () => void;
    pauseSound: () => void;

    currentPlaying: string;

    isLoading: boolean;

    duration: string;
    currentTime: string;
    dotPosition: number;
    setDotPosition: Dispatch<SetStateAction<number>>;
    barWidth: number;
    setBarWidth: Dispatch<SetStateAction<number>>;
    increment: number;

    isAudioPlaying: boolean;
    setIsAudioPlaying: Dispatch<SetStateAction<boolean>>;

}

interface Props {
    children: ReactNode;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayerContext = () => {
    const playerContext = useContext(PlayerContext);

    if (!playerContext)
        throw new Error("PlayerContext has to be used within <PlayerContext.Provider>")

    return playerContext;
}

export default function PlayerProvider(props: Props) {
    const [episode, setEpisode] = useState<EpisodeType | null>(null);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPlaying, setCurrentPlaying] = useState('');

    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [dotPosition, setDotPosition] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [increment, setIncrement] = useState(0);

    const [sound, setSound] = useState<Audio.Sound | null>(null);

    async function playSound() {
        if (currentPlaying !== episode!.url) {
            await unloadingSound();
            setIsLoading(true);
            console.log('Loading Sound');
            const { sound: audioSound } = await Audio.Sound.createAsync({ uri: episode!.url });
            setSound(audioSound);
            setIsLoading(false);
            setSound((state) => {
                async function handlerPlaySound() {
                    console.log('Playing Sound');
                    setIsPlaying(true);
                    await state!.playAsync();
                    setCurrentPlaying(episode!.url);
                }

                handlerPlaySound();
                return state;
            });
        } else {
            console.log('Playing Sound');
            setIsPlaying(true);
            await sound!.playAsync();
        }

        await playNotification(title);
    }

    async function pauseSound() {
        if (sound) {
            setIsPlaying(false);
            console.log('Pausing Sound');
            await sound!.pauseAsync();
        }
    }

    async function unloadingSound() {
        if (sound) {
            console.log('Unloading Sound');
            sound!.unloadAsync();
            setSound(null);
        }
    }

    function formatMilliToUTCTime(value: number) {
        return new Date(0, 0, 0, 0, 0, 0, value).toTimeString().substring(0, 8);
    }

    useEffect(() => {
        async function getAudioInfo() {
            if (!sound) return;
            const status: any = await sound!.getStatusAsync();
            setDuration(formatMilliToUTCTime(status.durationMillis));
            setIncrement(barWidth / (status.durationMillis / 1000));
            setDotPosition(0)
        }

        async function handlerPlayerEvents() {
            if (!sound) return;
            const status: any = await sound!.getStatusAsync();
            if (!status.isLoaded) return;
            setDotPosition(dot => dot + increment);
            setCurrentTime(formatMilliToUTCTime(status.positionMillis));

            if (dotPosition + increment > barWidth) {
                pauseSound();
            }
        }

        const interval = setInterval(() => {
            handlerPlayerEvents();
        }, 1000);

        if (!isAudioPlaying) clearInterval(interval);

        getAudioInfo();
    }, [sound]);

    useEffect(() => {
        async function configureAudio() {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                playThroughEarpieceAndroid: false
            });
        }

        configureAudio();
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                sound,
                episode,
                setEpisode,
                image,
                setImage,
                setTitle,
                title,
                isPlaying,
                setIsPlaying,
                playSound,
                pauseSound,
                isLoading,
                currentPlaying,
                barWidth,
                currentTime,
                dotPosition,
                duration,
                increment,
                setBarWidth,
                setDotPosition,
                isAudioPlaying,
                setIsAudioPlaying,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}