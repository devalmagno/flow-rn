import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Title from '../components/Title';
import Header from '../components/Header';
import HistoryContainer from '../components/HistoryContainer';
import colors from '../globals/colors';

export default function History() {
    return (
        <View style={styles.container}>
            <Header />
            <Title
                title='Histórico'
                icon={
                    <FontAwesome5 name="history" size={20} color={colors.title} />
                }
            />

            <HistoryContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
    },
});