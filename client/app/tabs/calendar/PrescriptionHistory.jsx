import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { FAB } from 'react-native-paper';
import styles from './PrescriptionHistory.style';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const PrescriptionHistory = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
      />
    </SafeAreaView>
  )
}

export default PrescriptionHistory;