import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionView.style';

const PrescriptionView = (props) => {
  const { prescription, selected, setSelected } = props;
  const { title, status, dose, dailyFrequency, json, frequency, id } = prescription;
  const frequencyText = frequency === 1 ? `${dose} mg - ${dailyFrequency} times per day` : `${dose} mg every ${frequency} days`;

  let dotStyle = styles.active;
  switch (status) {
    case status === "Paused":
      dotStyle = styles.paused
      break;
    case status === "Active":
    default:
      break;
  };

  return (
    <View style={StyleSheet.compose(styles.container, selected === id ? styles.selected : "")}>
      <TouchableWithoutFeedback
        onPress={() => { selected === id ? setSelected(null) : setSelected(id) }}
        style={styles.button}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text>{frequencyText}</Text>
          </View>
          <View style={styles.rightSide}>
            <View style={StyleSheet.compose(styles.dot, dotStyle)} />
            <Text>{status}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
};

export default PrescriptionView;