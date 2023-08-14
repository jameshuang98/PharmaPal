import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS } from '../../constants';

const TimePicker = (props) => {
    const { property, value, label, handleChange } = props;

    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        setTime(selectedDate);
        console.log('event', event)
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <Button onPress={() => setShow(true)} title="Show time picker!" />
            <Text>selected: {time.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
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
    }
});

export default TimePicker;