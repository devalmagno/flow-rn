import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../globals/colors';


export default function PodcastScreen() {
    return (
        <View style={styles.container}>

            <View style={{ gap: 8 }}>
                <View style={styles.image}></View>
                <View style={{ backgroundColor: colors.gray, borderRadius: 4 }}>
                    <Text style={styles.title}>Flow Podcast</Text>
                </View>
                <View style={styles.row}>
                    <Feather name="users" size={16} color={colors.gray} />
                    <Text style={styles.subtitle}>Apresentado por:</Text>
                    <Text style={{ ...styles.subtitle, fontFamily: 'Inter500' }}>
                        Lorem Ipsum
                    </Text>
                </View>
                <View style={styles.row}>
                    <Feather name="headphones" size={16} color={colors.gray} />
                    <Text style={styles.subtitle}>363 episódios</Text>
                </View>

                <View style={{ backgroundColor: colors.gray, borderRadius: 4 }}>
                    <Text style={styles.subtitle}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit sint, dolorem earum dignissimos sit libero nihil nisi est exercitationem modi consequuntur iste numquam repellat laudantium aliquam dolorum labore, amet quo!
                    </Text>
                </View>
                <View>

                    <View style={styles.dropdown}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 64,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: colors.gray,
    },
    title: {
        fontFamily: 'Poppins600',
        fontSize: 18,
        color: colors.gray,
    },
    image: {
        width: '100%',
        height: 132,
        borderRadius: 4,
        backgroundColor: colors.gray,
    },
    subtitle: {
        fontFamily: 'Inter400',
        fontSize: 15,
        color: colors.gray,
    },
    dropdown: {
        height: 32,
        width: '100%',
        backgroundColor: colors.gray,
        borderRadius: 4,
    },
});