import { View, Text, SafeAreaView, FlatList, ScrollView, Button, TouchableWithoutFeedback, Modal, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { FAB } from 'react-native-paper';
import usePrescriptionData from '../../hooks/usePrescriptionData';
import styles from './PrescriptionList.style';
import PrescriptionView from '../../../components/list/PrescriptionView';
import TextBox from '../../../components/common/TextBox';
import NumberBox from '../../../components/common/NumberBox';
import DataPicker from '../../../components/common/DataPicker';
import NumberBoxButton from '../../../components/common/NumberBoxButton';
import TimePicker from '../../../components/common/TimePicker';
import { statuses, daysOfWeek } from '../../../constants/models';
import DropDownPicker from 'react-native-dropdown-picker';

const PrescriptionList = () => {
  const { state } = usePrescriptionData();
  // console.log("prescriptionList state", state);

  const [selected, setSelected] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    dailyFrequency: 1,
    dose: 0,
    frequency: 1,
    recurringDays: "",
    bitmaskDays: 0,
    json: {},
    status: "",
    title: "",
    userId: 1
  });
  //{"1": "1690117371", "2": "1690167372", "3": "1690123372" }
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (key, value) => {
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: value
    }));
  };

  const handleNumberInputChange = (key, value) => {
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: parseInt(value.replace(/[^0-9]/g, '')) // replace any non-numeric input
    }));
  };

  const handleDaysInputChange = (key, value) => {
    let bitmaskValue = 0;
    for (const day of value) {
      bitmaskValue += daysOfWeek[day]
    };
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: value,
      bitmaskDays: bitmaskValue
    }));
  };

  const handleJsonInputChange = (key, value, doseNumber) => {
    setPrescriptionForm(prevForm => ({
      ...prevForm,
      [key]: value
    }));
  };

  console.log("prescriptionForm", prescriptionForm)

  const [dropdowns, setDropdowns] = useState([
    { key: 'status', isOpen: false },
    { key: 'recurringDays', isOpen: false },
    // Add more dropdowns as needed
  ]);

  const onDropdownOpen = useCallback((key, open) => {
    const updatedDropdowns = dropdowns.map((dropdown) =>
      dropdown.key === key ? { ...dropdown, isOpen: open } : { ...dropdown, isOpen: false }
    );
    setDropdowns(updatedDropdowns);
  }, [dropdowns]);
  // console.log('dropdowns', dropdowns)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => {
        setSelected(null);
        onDropdownOpen("");
      }}>
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
            <TouchableWithoutFeedback onPress={() => {
              onDropdownOpen("");
              console.log('pressed')
            }}>
              <View style={styles.modalView}>
                <TextBox
                  property="title"
                  value={prescriptionForm.title}
                  label="Prescription Name:"
                  handleChange={handleInputChange}
                />

                <NumberBox
                  property="dose"
                  value={prescriptionForm.dose}
                  label="Dose amount (mg):"
                  handleNumberInputChange={handleNumberInputChange}
                />

                <DataPicker
                  label="Status: "
                  values={statuses}
                  zIndex={3000}
                  zIndexInverse={1000}
                  multiple={false}
                  dropdownKey='status'
                  onDropdownOpen={onDropdownOpen}
                  isOpen={dropdowns.filter((d) => d.key === 'status')[0].isOpen}
                  handleChange={handleInputChange}
                />

                <DataPicker
                  label="Recurring Days: "
                  values={Object.keys(daysOfWeek)}
                  zIndex={1000}
                  zIndexInverse={3000}
                  multiple={true}
                  dropdownKey='recurringDays'
                  onDropdownOpen={onDropdownOpen}
                  isOpen={dropdowns.filter((d) => d.key === 'recurringDays')[0].isOpen}
                  handleChange={handleDaysInputChange}
                />

                <NumberBoxButton
                  label="Daily Frequency: "
                  property="dailyFrequency"
                  state={prescriptionForm}
                  setState={setPrescriptionForm}
                />

                <TimePicker
                  label="Prescription Time(s): "
                  property="json"
                  count={prescriptionForm.dailyFrequency}
                  state={prescriptionForm}
                  setState={setPrescriptionForm}
                />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </View>
      </Modal >
    </SafeAreaView >
  )
};


export default PrescriptionList;