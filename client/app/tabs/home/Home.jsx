import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styles from "./home.style";
import PrescriptionItem from '../../../components/PrescriptionItem';
import usePrescriptionData from '../../hooks/usePrescriptionData';

const Home = () => {
  const { state } = usePrescriptionData();
  prescriptionData = state.prescriptionData;
  console.log(state);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello James</Text>
          <Text style={styles.welcomeMessage}>Here are your prescriptions for today:</Text>
          <Text>{prescriptionData[0].id}</Text>
        </View>
        <PrescriptionItem 
          title={prescriptionData[0].title}
          dose={prescriptionData[0].dose}
          id={prescriptionData[0].id}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home;