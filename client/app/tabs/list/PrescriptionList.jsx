import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import styles from './PrescriptionList.style';


const PrescriptionList = (props) => {
  const { state } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Prescriptions</Text>
        </View>
        {/* <FlatList
        data={data}
        renderItem={({ item }) => (
          <PopularJobCard
          item={item}
          selectedJob={selectedJob}
          handleCardPress={handleCardPress}
          />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        /> */}

      </View>
    </SafeAreaView>
  )
}

export default PrescriptionList;