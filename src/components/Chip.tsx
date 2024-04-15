import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChipProps {
    text: string;
    backgroundColor?: string;
}

const Chip: React.FC<ChipProps> = ({ text, backgroundColor }) => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: backgroundColor || 'lightyellow' }, // Use backgroundColor directly
            ]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 5,
        color:"white",
        alignSelf: 'flex-start',
    },
    text:{
        color:"white",
        fontWeight:"bold",
        fontSize:15
    }
});

export default Chip;
