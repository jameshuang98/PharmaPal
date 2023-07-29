import { View, Text } from 'react-native';
import { useState } from 'react';
import styles from './prescriptionItem.style';
import Checkbox from 'expo-checkbox';

const PrescriptionItem = (props) => {
  const { title, dose } = props;
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{dose} mg</Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
      </View>
    </View>
  )
};

export default PrescriptionItem