import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { COLORS } from '../../constants';

const DataPicker = (props) => {
    const { label, values, initialValue, zIndex, zIndexInverse, multiple, dropdownKey, onDropdownOpen, isOpen, handleChange } = props;
    const pickerItems = values.map((item) => {
        return { label: item, value: item }
    });

    const [value, setValue] = useState(initialValue);
    const [items, setItems] = useState(pickerItems);


    return (
        <View style={[styles.container, {zIndex: zIndex}]}>
            <Text style={styles.label}>{label}</Text>
            <DropDownPicker
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                multiple={multiple}
                mode={'BADGE'}
                open={isOpen}
                value={value}
                items={items}
                setOpen={() => onDropdownOpen(dropdownKey, isOpen ? !isOpen : true)}
                setValue={setValue}
                setItems={setItems}
                // onOpen={() => onDropdownOpen(dropdownKey)}
                onChangeValue={(value) => {
                    handleChange(dropdownKey, value)
                    console.log(value)
                }}
                style={styles.input}
            >
            </DropDownPicker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10
    },
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
        width: '100%',
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