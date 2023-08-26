// React and React Native imports
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  Animated,
} from 'react-native';

// Third-party library imports
import { FAB, Button, ToggleButton } from 'react-native-paper';

// Local component imports
import PrescriptionView from '../../../components/list/PrescriptionView';
import TextBox from '../../../components/common/TextBox';
import NumberBox from '../../../components/common/NumberBox';
import DataPicker from '../../../components/common/DataPicker';
import NumberBoxButton from '../../../components/common/NumberBoxButton';
import TimePicker from '../../../components/common/TimePicker';

// Local hook imports
import usePrescriptionData from '../../hooks/usePrescriptionData';

// Local style import
import styles from './PrescriptionList.style';

// Constants and helpers imports
import { statuses, daysOfWeek, emptyPrescription } from '../../../constants/models';
import { serverTimestamp } from 'firebase/firestore';
import { convertPrescriptionFormToPrescription, convertPrescriptionToPrescriptionForm } from '../../helpers/helpers';



const PrescriptionList = () => {
  let { state, createPrescription, updatePrescription, deletePrescription } = usePrescriptionData();
  console.log("prescriptionList state", state);

  const [selected, setSelected] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState(emptyPrescription);
  const [modalVisible, setModalVisible] = useState(false);
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
      frequency: bitmaskValue
    }));
  };

  console.log("prescriptionForm", prescriptionForm)


  const reset = () => {
    onDropdownOpen("", false);
    setModalVisible(false)
    setPrescriptionForm(emptyPrescription)
    setSelected(null);
    toggleFabButtons(false);
  };

  const save = () => {
    const prescription = convertPrescriptionFormToPrescription(prescriptionForm)
    const isPrescriptionExist = state.prescriptionData.find(p => p.id === prescriptionForm.id) ?? false;
    console.log('isPrescriptionExist', isPrescriptionExist)
    if (!isPrescriptionExist) {
      createPrescription(prescription)
        .then((res) => {
          console.log('created prescription', res);
          reset();
        })
        .catch(err => {
          console.log(err.message)
        })
    } else {
      updatePrescription(prescriptionForm.id, prescription)
    }
    reset();
  }



  const animationValue1 = useRef(new Animated.Value(0)).current;
  const animationValue2 = useRef(new Animated.Value(0)).current;
  const toggleFabButtons = (toggleOn) => {
    if (!toggleOn) {
      Animated.timing(animationValue1, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(animationValue2, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationValue1, {
        toValue: -70,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(animationValue2, {
        toValue: -140,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelectPrescription = (id) => {
    if (id) {
      setSelected(id);
      toggleFabButtons(true);
      let prescription = state.prescriptionData.find(p => p.id === id);
      let newFormData = convertPrescriptionToPrescriptionForm(prescription);
      setPrescriptionForm(newFormData);
    } else {
      setSelected(null);
      toggleFabButtons(false);
      setPrescriptionForm(emptyPrescription);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        setSelected(null);
        toggleFabButtons();
      }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.tabTitle}>All Prescriptions</Text>
          </View>
          <FlatList
            data={state.prescriptionData}
            renderItem={({ item }) => (
              <PrescriptionView
                prescription={item}
                selected={selected}
                handleSelectPrescription={handleSelectPrescription}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: 16 }}
          />
          {selected && <Text>{selected}</Text>}

          <Animated.View style={[{ transform: [{ translateY: animationValue2 }] }, styles.fabContainer, { zIndex: 5 }]}>
            <FAB
              icon="delete"
              style={styles.fab}
              accessibilityLabel="Delete prescription"
              onPress={() => {
                deletePrescription(selected);
                reset();
              }}
            />
          </Animated.View>

          <Animated.View style={[{ transform: [{ translateY: animationValue1 }] }, styles.fabContainer, { zIndex: 10 }]}>
            <FAB
              icon="pencil"
              style={styles.fab}
              accessibilityLabel="Edit prescription"
              onPress={() => setModalVisible(true)}
            />
          </Animated.View>
          <View  style={[{ zIndex: 15 }]}>

            <FAB
              icon="plus"
              style={[styles.fabContainer, styles.fab, { zIndex: 15 }]}
              accessibilityLabel="Add new prescription"
              onPress={() => {
                handleSelectPrescription(null);
                setModalVisible(true);
              }}
            />
          </View>

          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              reset();
            }}>
            <View style={styles.modalContainer}>
              <Pressable style={styles.outsideModal}
                onPress={(event) => {
                  if (event.target == event.currentTarget) {
                    reset();
                  }
                }} >
                <TouchableWithoutFeedback onPress={() => {
                  onDropdownOpen("");
                  console.log('pressed')
                }}>
                  <View style={styles.modalView}>
                    <View>
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
                        initialValue={prescriptionForm.status}
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
                        initialValue={prescriptionForm.recurringDays}
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

                    <View style={styles.formButtons}>
                      <Button mode="contained" onPress={reset} style={styles.cancel}>
                        Cancel
                      </Button>
                      <Button mode="contained" onPress={save} style={styles.save}>
                        Save
                      </Button>
                    </View>

                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </View>
          </Modal >

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView >
  )
};


export default PrescriptionList;