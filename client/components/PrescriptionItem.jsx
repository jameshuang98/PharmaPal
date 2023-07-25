import { View, Text } from 'react-native';
import { useState } from 'react';
import styles from './prescriptionItem.style';
import CheckBox from '@react-native-community/checkbox';

const PrescriptionItem = (props) => {
  const { title, dose } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{dose} mg</Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
    </View>
  )
};

export default PrescriptionItem