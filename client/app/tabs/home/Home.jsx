import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import styles from "./home.style";
import PrescriptionTimeSlot from '../../../components/home/PrescriptionTimeSlot';
import usePrescriptionData from '../../hooks/usePrescriptionData';

const Home = () => {
  const { state } = usePrescriptionData();
  // console.log(state);
  let timeslotData = {};
  for (const p of state.prescriptionData) {
    let json = JSON.parse(p.json);
    for (const doseId in json) {
      const t = json[doseId]
      if (!timeslotData[t]) {
        timeslotData[t] = []
      }
      timeslotData[t].push({
        title: p.title,
        dose: p.dose,
        doseId: doseId,
        prescriptionId: p.id
      })
    }
  }
  console.log("timeslotData", timeslotData)
  const timeslots = Object.keys(timeslotData);

  const parsedTimeslots = timeslots.map((time, idx) =>
    <PrescriptionTimeSlot
      key={idx}
      time={time}
      doseList={timeslotData[time]}
    />
  );

  return (
    <SafeAreaView style={styles.home}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.tabTitle}>Today's Prescriptions</Text>
          </View>
          {parsedTimeslots}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;