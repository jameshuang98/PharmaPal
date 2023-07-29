import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import usePrescriptionData from '../hooks/usePrescriptionData';

const CREATE_RECORDS = 'CREATE_RECORDS';

const { state, createRecord } = usePrescriptionData;

const handleCreateRecords = () => {
  try {
    // Insert documents to record collection
    for (const p of state.prescriptionData) {
      let json = JSON.parse(p.json);
      for (const dose of Object.keys(json)) {
        createRecord(p.id, dose)
      }
    }
    // Call `BackgroundFetch.Result.NewData` to indicate success.
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Error in background task:', error);

    // If there was an error, return `BackgroundFetch.Result.Failed`
    return BackgroundFetch.Result.Failed;
  }
};

TaskManager.defineTask(CREATE_RECORDS, handleCreateRecords);


