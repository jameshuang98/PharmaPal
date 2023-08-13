import { View, Text, SafeAreaView, FlatList, ScrollView, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import { FAB } from 'react-native-paper';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import styles from './PrescriptionList.style';
import PrescriptionView from '../../../components/list/PrescriptionView';
import TextBox from '../../../components/common/TextBox';
import NumberBox from '../../../components/common/NumberBox';
import DataPicker from '../../../components/common/DataPicker';
import { statuses, daysOfWeek } from '../../../constants/models';

const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  console.log("prescriptionList state", state);

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
  const [inputFocus, setInputFocus] = useState(null);

  const handleInputChange = (key, value) => {
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: value
    }));
  };

  const handleNumberInputChange = (key, value) => {
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: value.replace(/[^0-9]/g, '') // replace any non-numeric input
    }));
  };
  console.log("prescriptionForm", prescriptionForm)
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
        icon="plus"
        style={styles.fab}
        accessibilityLabel="Add new prescription"
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
          <Pressable style={styles.outsideModal}
            onPress={(event) => {
              if (event.target == event.currentTarget) {
                setModalVisible(false);
              }
            }} >
            <View style={styles.modalView}>

              <TextBox
                property="title"
                value={prescriptionForm.title}
                label="Prescription Name:"
                handleInputChange={handleInputChange}
              />

              <NumberBox
                property="dose"
                value={prescriptionForm.dose}
                label="Dose amount:"
                handleNumberInputChange={handleNumberInputChange}
              />

              <DataPicker
                label="Status: "
                values={statuses}
              />

              <DataPicker
                label="Repeat: "
                values={Object.keys(daysOfWeek)}
              />


            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  )
};


export default PrescriptionList;