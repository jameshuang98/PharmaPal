import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const TextBox = (props) => {
    const { property, value, label, handleInputChange } = props;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    value && styles.hasValue
                ]}
                value={value}
                onChangeText={(value) => handleInputChange(property, value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#F0F0F0',
        marginBottom: 10,
    },
    inputFocused: {
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: COLORS.white
    },
    hasValue: {
        backgroundColor: COLORS.white
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    }
});

export default TextBox;