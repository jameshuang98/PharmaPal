import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableWithoutFeedback, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './PrescriptionList.style';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import PrescriptionView from '../../../components/list/PrescriptionView';
import { FAB } from '@rneui/themed';

const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  const [selected, setSelected] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    dailyFrequency: 1,
    dose: 0,
    frequency: 1,
    json: "",
    status: "",
    title: "",
    userId: 1
  });
  const [modalVisible, setModalVisible] = useState(false);
  console.log("prescriptionList state", state);

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
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              onChangeText={(title) => setPrescriptionForm({...prescriptionForm, title: title})}
              value={prescriptionForm.title}
              placeholder='Enter Prescription Title'
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
};


export default PrescriptionList;