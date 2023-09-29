import isEmpty from 'lodash/isEmpty';
// import {MarkedDates} from '../../../src/types';

export function getRecordItems(records, prescriptions) {
  console.log("records", records)
  console.log("prescriptions", prescriptions)

  const items = records.reduce((result, record) => {
    const { createdAt, prescriptionId, taken, takenAt, doseId, id } = record;

    // Convert timestamp to yyyy-mm-dd format
    const date = new Date(createdAt.seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const prescription = prescriptions.find(p => p.id == prescriptionId);
    // console.log('prescription', prescription)
    const dose = prescription.dose;
    const title = prescription.title;


    // Check if there is an existing entry for this date
    const existingEntry = result.find((entry) => entry.title === formattedDate);

    // If an entry for this date exists, add the data to it
    if (existingEntry) {
      existingEntry.data.push({
        prescriptionId,
        taken,
        takenAt,
        doseId,
        dose,
        title,
        id,
      });
    } else {
      // Otherwise, create a new entry
      const newEntry = {
        title: formattedDate,
        data: [
          {
            prescriptionId,
            taken,
            takenAt,
            doseId,
            dose,
            title,
            id,
          },
        ],
      };
      result.push(newEntry);
    }

    return result;
  }, []);

  items.sort((a, b) => {
    const dateA = new Date(a.title);
    const dateB = new Date(b.title);
    return dateA - dateB;
  });

  return items;
}

export function getMarkedDates(items) {
  const marked = {};

  items.forEach(item => {
    // NOTE: only mark dates with data
    marked[item.title] = { marked: true };
  });
  return marked;
}