import { View, Text } from 'react-native';
import React from 'react';
import styles from './prescriptionTimeSlot.style';
import PrescriptionItem from './PrescriptionItem';

const PrescriptionTimeSlot = (props) => {
    const { time, doseList } = props;

    doseList.sort((a, b) => a.title.localeCompare(b.title));
    const parsedDoses = doseList.map((dose, idx) =>
        <PrescriptionItem
            key={idx}
            title={dose.title}
            dose={dose.dose}
            doseId={dose.doseId}
            prescriptionId={dose.prescriptionId}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.slot}>
                <Text style={styles.time}>{time}</Text>
            </View>
            {parsedDoses}
        </View>
    )
};

export default PrescriptionTimeSlot;