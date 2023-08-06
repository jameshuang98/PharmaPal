import { View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useState } from 'react';
import styles from './PrescriptionList.style';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import PrescriptionView from '../../../components/list/PrescriptionView';


const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  const [selected, setSelected] = useState(null)
  console.log("prescriptionList state", state)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.titleContainer}>
          <Text style={styles.tabTitle}>All Prescriptions</Text>
        </View>
        <FlatList
          data={state.prescriptionData}
          renderItem={({ item }) => (
            <PrescriptionView
              prescription={item}
              setSelected={setSelected}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: 16 }}
        />
        {selected && <Text>{selected}</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrescriptionList;