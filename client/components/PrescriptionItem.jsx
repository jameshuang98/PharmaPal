import { View, Text } from 'react-native'
import React from 'react'
import styles from './PrescriptionItem.style'

const PrescriptionItem = (props) => {
  const { title, dose, id } = props;
  return (
    <View style={styles.container}>
      <Text>Zoloft</Text>
    </View>
  )
}

export default PrescriptionItem