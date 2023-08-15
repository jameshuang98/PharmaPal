import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants';

const NumberBoxButton = (props) => {
    const { label, property, state, setState } = props;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    // console.log('state', state)
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <TextInput
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={false}
                    selectTextOnFocus={false}
                    contextMenuHidden={true}
                    style={[
                        styles.input,
                        isFocused && styles.inputFocused,
                    ]}
                    value={state[property].toString()}
                />
                <View style={styles.buttonContainer} >
                    <Button
                        icon="plus"
                        mode="flat"
                        onPress={() => setState(prev => ({
                            ...prev,
                            [property]: state[property] + 1
                        }))}
                        style={styles.button}
                        // compact={true}
                        buttonColor={COLORS.lighterWhite}
                    />

                    <Button
                        icon="minus"
                        mode="flat"
                        disabled={state[property] <= 0}
                        onPress={() => setState(prev => ({
                            ...prev,
                            [property]: state[property] - 1
                        }))}
                        style={styles.button}
                        // compact={true}
                        buttonColor={COLORS.lighterWhite}
                    />

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
        marginBottom: 10,
        width: '30%',
        textAlign: 'center',
    },

    inputFocused: {
        outlineWidth: 0
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    buttonContainer: {
        marginLeft: 20,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        height: '70%'
        // paddingVertical: 3,
        // paddingHorizontal: 3,
    },
    button: {
        marginRight: 10,
        paddingLeft: 15,
        paddingTop: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 50,
        minWidth: 50,
        color: COLORS.primary
    }
});

export default NumberBoxButton;