import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionItem.style';
import Checkbox from 'expo-checkbox';

const PrescriptionView = (props) => {
  const { title, dose, doseId, prescriptionId } = props;
  const [record, setRecord] = useState({ taken: false });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{dose} mg</Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={record.taken}
          onValueChange={setChecked}
          color={record.taken ? '#4630EB' : undefined}
        />
      </View>
    </View>
  )
};

export default PrescriptionView