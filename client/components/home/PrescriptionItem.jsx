import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionItem.style';
import Checkbox from 'expo-checkbox';
import usePrescriptionData from '../../app/hooks/usePrescriptionData';
import { getTodayTimestamp } from '../../app/helpers/helpers';
import { Timestamp, serverTimestamp } from 'firebase/firestore';

const PrescriptionItem = (props) => {
  const { title, dose, doseId, prescriptionId } = props;
  const { getRecord, createRecord, updateRecord } = usePrescriptionData();
  const [record, setRecord] = useState({ taken: false });
  // console.log('doseId', doseId)
  // console.log('prescriptionId', prescriptionId)

  const setChecked = () => {
    const rec = {
      prescriptionId,
      doseId,
      createdAt: Timestamp.fromDate(getTodayTimestamp()),
      taken: !record.taken,
      takenAt: serverTimestamp()
    }
    if (!record.id) {
      createRecord(rec)
        .then((res) => {
          console.log('createRecord res', res)
          if (res) {
            setRecord(res);
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    } else {
      updateRecord(record.id, !record.taken, record.takenAt);
      setRecord({
        ...record,
        taken: !record.taken,
        takenAt: record.taken ? serverTimestamp() : record.takenAt
      });
    }
  };

  useEffect(() => {
    const rec = {
      prescriptionId,
      doseId,
      createdAt: Timestamp.fromDate(getTodayTimestamp()),
      taken: false,
      takenAt: Timestamp.fromDate(getTodayTimestamp())
    }
    // console.log("useEffect rec", rec)
    getRecord(prescriptionId, doseId, rec.createdAt)
      .then((res) => {
        console.log('getRecord res', res)
        if (res) {
          const newDate = new Date(res.createdAt.seconds * 1000)
          console.log('getRecord newDate', newDate)
          setRecord(res);
        } else {
          createRecord(rec)
            .then((res) => {
              console.log('createRecord res', res)
              setRecord(res);
            })
            .catch(err => {
              console.log(err.message)
            })
        };
      })
      .catch(err => {
        console.log(err.message)
      })
  }, []);


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