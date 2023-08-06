import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import styles from './PrescriptionList.style';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import PrescriptionView from '../../../components/list/PrescriptionView';
import { FAB } from '@rneui/themed';

const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  const [selected, setSelected] = useState(null)
  console.log("prescriptionList state", state)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setSelected(null)}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.titleContainer}>
            <Text style={styles.tabTitle}>All Prescriptions</Text>
          </View>
          <FlatList
            data={state.prescriptionData}
            renderItem={({ item }) => (
              <PrescriptionView
                prescription={item}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: 16 }}
          />
          {selected && <Text>{selected}</Text>}
        </ScrollView>
      </TouchableWithoutFeedback>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        size="small"
        placement="right"
      />
    </SafeAreaView>
  )
};

export default PrescriptionList;