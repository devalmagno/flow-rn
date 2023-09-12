import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Props, styles } from './DownloadDone';


export default function DownloadDone({ episode }: Props) {
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <Feather name="arrow-down-circle" size={24} color={"#717171"} style={{ zIndex: 1 }} />
            </TouchableOpacity>
        </View>
    );
}
