import { View, Text, SafeAreaView, FlatList, ScrollView, Button, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import { FAB } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import styles from './PrescriptionList.style';
import PrescriptionView from '../../../components/list/PrescriptionView';
import TextBox from '../../../components/common/TextBox';
import NumberBox from '../../../components/common/NumberBox';
import DataPicker from '../../../components/common/DataPicker';
import NumberBoxButton from '../../../components/common/NumberBoxButton';
import { statuses, daysOfWeek } from '../../../constants/models';

const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  // console.log("prescriptionList state", state);

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
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };




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
  // console.log("prescriptionForm", prescriptionForm)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setSelected(null)}>
        <View>
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
        </View>
      </TouchableWithoutFeedback>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      {/* <Text>selected: {date.toLocaleString()}</Text> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

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
              {prescriptionForm.dose}
              <DataPicker
                label="Status: "
                values={statuses}
              />

              <DataPicker
                label="Repeat: "
                values={Object.keys(daysOfWeek)}
              />

              <NumberBoxButton
                label="Daily Frequency: "
                property="frequency"
                state={prescriptionForm}
                setState={setPrescriptionForm}
              />



            </View>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  )
};


export default PrescriptionList;