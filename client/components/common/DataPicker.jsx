import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { COLORS } from '../../constants';

const DataPicker = (props) => {
    const { label, values } = props;
    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                }
                style={styles.input}
            >
                {values.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>
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
        backgroundColor: COLORS.white,
        marginBottom: 10,
    },
    inputFocused: {
        borderColor: 'black',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    }
});

export default DataPicker;