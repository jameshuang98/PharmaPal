import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import testIDs from '../../../constants/testIDs';
import Checkbox from 'expo-checkbox';
import { getTimeToMinute } from '../../helpers/helpers';

const AgendaItem = (props) => {
    const { item } = props;
    console.log('item', item)
    const takenText = item.takenAt ? `Taken at ${getTimeToMinute(item.takenAt.seconds)}` : "Taken";

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, []);

    return (
        <TouchableOpacity onPress={itemPressed} style={styles.item} testID={testIDs.agenda.ITEM}>
            <View>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemDoseText}>{item.dose}mg</Text>
            </View>
            <View style={styles.rightSection}>
                <View>
                    {item.taken && <Text style={styles.itemTakenText}>{takenText}</Text>}
                </View>
                <View style={styles.itemButtonContainer}>
                    <Checkbox
                        value={item.taken}
                        disabled
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(AgendaItem);


const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    itemTakenText: {
        color: 'black',
        alignSelf: 'center',
        marginLeft: 12
    },
    itemDoseText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 8
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 16
    },
    itemButtonContainer: {
        marginLeft: 10
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});