import { ActivityIndicator, StyleSheet } from "react-native";

import { useDataContext } from "../contexts/DataContext";
import colors from "../globals/colors";

export default function Loading() {
    const { isFetching } = useDataContext();

    return (
        <ActivityIndicator
            style={isFetching ? { ...StyleSheet.absoluteFillObject, ...styles.loading } : styles.hide}
            color={colors.primary}
            size="large"
            animating={isFetching}
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