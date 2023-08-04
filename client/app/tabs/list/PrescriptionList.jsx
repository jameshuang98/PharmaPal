import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import styles from './PrescriptionList.style';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import PrescriptionView from '../../../components/list/PrescriptionView';


const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  console.log("prescriptionList state", state)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Prescriptions</Text>
        </View>
        <FlatList
          data={state.prescriptionData}
          renderItem={({ item }) => (
            <PrescriptionView
              prescription={item}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: 16 }}
        />

      </View>
    </SafeAreaView>
  )
}

export default PrescriptionList;