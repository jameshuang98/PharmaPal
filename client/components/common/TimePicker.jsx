import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { COLORS, SIZES } from '../../constants';

const TimePicker = (props) => {
    const { label, property, count, state, setState } = props;
    const [json, setJson] = useState(state);

    const [listDateTimePickers, setListDateTimePickers] = useState([]);
    
    useEffect(() => {
        let list = [];
        console.log('count', count)
        for (let i = 0; i < count; i++) {
            if (!Object.hasOwn(state[property], i)) {
                setState(prev => ({
                    ...prev,
                    [property]: { ...state[property], [i]: new Date() }
                }))
            }
            list.push(
                <View key={i} style={styles.container}>
                    <Text style={styles.dateLabel}>Dose #{i + 1}: </Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={Object.hasOwn(state[property], i) ? state[property][i] : new Date()}
                        mode={'time'}
                        is24Hour={true}
                        onChange={(event, time) => onChange(event, time, i)}
                        style={styles.input}
                    />
                </View>
            )
        };
        setListDateTimePickers(list)
    }, [count]);

    const [time, setTime] = useState(new Date());

    const onChange = (event, selectedTime, doseNumber) => {
        setState(prev => ({
            ...prev,
            [property]: { ...state[property], [doseNumber]: selectedTime }
        }))
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            {listDateTimePickers}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    dateLabel: {
        fontSize: SIZES.medium,
        marginTop: 8,
        marginLeft: SIZES.xLarge
    },
    input: {
        // marginTop: 12,
        marginHorizontal: SIZES.xSmall,
        fontSize: 16,
        marginBottom: 10,
        outlineWidth: 0,
    },
    inputFocused: {
        outlineWidth: 0,
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
    },
    button: {
        marginTop: 2,
        marginLeft: 15,
        paddingLeft: 15,
        paddingTop: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        minWidth: 45,
        width: 45,
        height: 45,
        borderRadius: 30
    }
});

export default TimePicker;