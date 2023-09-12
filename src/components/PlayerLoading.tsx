import { ActivityIndicator, StyleSheet } from "react-native";

import { usePlayerContext } from "../contexts/PlayerContext";

export default function PlayerLoading() {
    const { isLoading } = usePlayerContext();

    return (
        <ActivityIndicator
            style={isLoading ? { ...StyleSheet.absoluteFillObject, ...styles.loading } : styles.hide}
            color="#FFC739"
            size="large"
            animating={isLoading}
        />
    )
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: '#0E0E0E',
        opacity: 0.8,
    },
    hide: {
        display: 'none',
    }
});