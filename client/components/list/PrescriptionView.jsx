import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionView.style';
import { getPrescriptionDescription } from '../../app/helpers/helpers';

const PrescriptionView = (props) => {
  const { prescription, selected, handleSelectPrescription } = props;
  const { title, status, dose, dailyFrequency, json, frequency, id } = prescription;
  const frequencyText = getPrescriptionDescription(dailyFrequency, frequency, dose);

  return (
    <View style={StyleSheet.compose(styles.container, selected === id ? styles.selected : "")}>
      <TouchableWithoutFeedback
        onPress={() => { selected === id ? handleSelectPrescription(null) : handleSelectPrescription(id); }}
        style={styles.button}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text>{frequencyText}</Text>
          </View>
          <View style={styles.rightSide}>
            <View style={StyleSheet.compose(styles.dot, status === "Active" ? styles.active : styles.paused)} />
            <Text>{status}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
};

export default PrescriptionView;