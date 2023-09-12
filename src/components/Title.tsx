import { ReactNode } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../globals/colors';

interface Props {
    title: string;
    icon: ReactNode;
}

export default function Title(props: Props) {
    return (
        <View style={styles.titleContainer}>
            {props.icon}
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    title: {
        fontFamily: 'Poppins600',
        color: colors.title,
        fontSize: 18,
    },
});