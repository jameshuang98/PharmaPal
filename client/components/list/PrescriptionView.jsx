import { View, Text, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './prescriptionView.style';

const PrescriptionView = ({ prescription }) => {
  const { title, status, dose, dailyFrequency, json, frequency } = prescription;
  const frequencyText = frequency === 1 ? `${dose} mg - ${dailyFrequency} times per day` : `${dose} mg every ${frequency} days`;

  const onPress = () => {
    console.log("press")
  }
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor="#d8a28c"
      style={styles.container}
    >
      <View>

        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{frequencyText}</Text>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.dot} />
          <Text>{status}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
};

export default PrescriptionView;