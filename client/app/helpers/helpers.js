import { daysOfWeek, emptyPrescription } from "../../constants/models";
import { serverTimestamp } from 'firebase/firestore';

// get the timestamp for 12:01AM for today
export function getTodayTimestamp() {
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(1);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0)

  return currentDate;
}

// A function to convert human-readable time to a sortable value
function convertToSortableTime(time) {
  const [hour, minute] = time.match(/\d+|\w+/g); // Extract hour and minute
  const isPM = time.toLowerCase().includes("pm");

  let sortableHour = parseInt(hour, 10);
  if (isPM && sortableHour !== 12) {
    sortableHour += 12;
  }
  if (!isPM && sortableHour === 12) {
    sortableHour = 0;
  }

  const sortableMinute = parseInt(minute, 10) || 0;

  return sortableHour * 60 + sortableMinute; // Convert to minutes since midnight
}

export function sortTimes(a, b) {

  const timeA = convertToSortableTime(a);
  const timeB = convertToSortableTime(b);

  return timeA - timeB; // Compare the sortable values
}

export function isSameDay(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1 * 1000); // Convert to milliseconds
  const date2 = new Date(timestamp2 * 1000); // Convert to milliseconds

  // Compare year, month, and day
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

//   // Example usage:
//   const timestamp1 = 1690662060; // Represents 2023-07-28T00:01:00-07:00 (12:01 AM)
//   const timestamp2 = 1690710005; // Represents 2023-07-28T22:20:05-07:00
//   console.log(isSameDay(timestamp1, timestamp2)); // Output: true (both timestamps are from the same day)

export function getTimeToMinute(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${ampm}`;
}

export function getSelectedDays(bitmask) {
  const selectedDays = [];
  for (const day in daysOfWeek) {
    if (bitmask & daysOfWeek[day]) {
      selectedDays.push(day);
    }
  }
  return selectedDays;
};

export function getPrescriptionDescription(dailyFrequency, frequency, dose) {
  const recurringDays = getSelectedDays(frequency);
  const numDays = recurringDays.length;

  if (frequency === 127) {
    return dailyFrequency === 1 ? `${dose} mg - every day` : `${dose} mg - ${dailyFrequency} times every day`;
  } else if (numDays === 0) {
    return 'No specific days selected';
  } else if (numDays === 1) {
    return `${dose} mg - every ${recurringDays[0]} `;
  } else if (numDays > 3) {
    return `${dose} mg - ${numDays} times per week`;
  } else {
    const lastDay = recurringDays[numDays - 1];
    const daysExceptLast = recurringDays.slice(0, length - 1).join(', ');
    return `${dose} mg - every ${daysExceptLast}, and ${lastDay} `;
  }
}

export function convertPrescriptionToPrescriptionForm(prescription) {
  let prescriptionForm = { ...emptyPrescription };
  prescriptionForm.id = prescription.id;
  prescriptionForm.dailyFrequency = prescription.dailyFrequency;
  prescriptionForm.dose = prescription.dose;
  prescriptionForm.frequency = prescription.frequency;
  prescriptionForm.recurringDays = getSelectedDays(prescription.frequency);
  prescriptionForm.json = JSON.parse(prescription.json);
  for (const key in prescriptionForm.json) {
    const dateObj = new Date(prescriptionForm.json[key] * 1000)
    prescriptionForm.json[key] = dateObj
  };
  prescriptionForm.userId = prescription.userId;
  prescriptionForm.title = prescription.title;
  prescriptionForm.status = prescription.status;
  prescriptionForm.createdAt = prescription.createdAt;
  return prescriptionForm;
};

export function convertPrescriptionFormToPrescription(prescriptionForm) {

  // remove extra entries in json (only need dailyFrequency num of doses)
  let json = Object.keys(prescriptionForm.json)
    .filter(dose => dose <= prescriptionForm.dailyFrequency)
    .reduce((json, key) => {
      json[key] = Math.floor(prescriptionForm.json[key].getTime() / 1000).toString();
      return json;
    }, {});

  const prescription = {
    createdAt: prescriptionForm.createdAt ?? serverTimestamp(),
    dailyFrequency: prescriptionForm.dailyFrequency,
    dose: prescriptionForm.dose,
    frequency: prescriptionForm.frequency,
    json: JSON.stringify(json),
    status: prescriptionForm.status,
    title: prescriptionForm.title,
    userId: prescriptionForm.userId
  };
  return prescription;
};

