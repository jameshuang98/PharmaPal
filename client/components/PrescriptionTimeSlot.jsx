import { View, Text } from 'react-native';
import React from 'react';
import styles from './prescriptionTimeSlot.style';
import PrescriptionItem from './PrescriptionItem';


const PrescriptionTimeSlot = (props) => {
    const { time, doseList } = props;
    const date = new Date(time * 1000);
    const formattedTime = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

    doseList.sort((a, b) => a.title.localeCompare(b.title));
    const parsedDoses = doseList.map((dose, idx) =>
        <PrescriptionItem
            key={idx}
            title={dose.title}
            dose={dose.dose}
        />
    );

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.timeslot}>{formattedTime}</Text>
            </View>
                {parsedDoses}
        </View>
    )
};

export default PrescriptionTimeSlot;