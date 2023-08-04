import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionView.style';

const PrescriptionView = ({prescription}) => {
  const { title, status, dose, dailyFrequency, json, frequency } = prescription;

  return (
    <View style={styles.container}>
      <View>
        <Text>{status}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text>{dose} mg</Text>
      </View>
      <View>

      </View>
    </View>
  )
};

export default PrescriptionView