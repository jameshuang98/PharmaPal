import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionItem.style';
import Checkbox from 'expo-checkbox';
import usePrescriptionData from '../app/hooks/usePrescriptionData';
import { getTodayTimestamp } from '../app/helpers/helpers';

const PrescriptionItem = (props) => {
  const { title, dose, doseId, prescriptionId } = props;
  const { getRecord } = usePrescriptionData();
  const [record, setRecord] = useState({taken: false});

  const setChecked = () => {
    setRecord({...record, taken:!record.taken})
  }

  useEffect(() => {
    getRecord(prescriptionId, doseId)
      .then((res) => {
        console.log('res', res)
        if (res) {
          setRecord(res);
        }
      })
      .catch(err => {
        console.log(err.message)
      })
  }, []);

  const timestamp = getTodayTimestamp();


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

export default PrescriptionItem