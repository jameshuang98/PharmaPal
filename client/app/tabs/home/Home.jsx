import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import styles from "./home.style";
import PrescriptionItem from '../../../components/PrescriptionItem';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello James</Text>
          <Text style={styles.welcomeMessage}>Here are your prescriptions for today:</Text>
        </View>
        <PrescriptionItem />
      </View>
    </SafeAreaView>
  )
}

export default Home;