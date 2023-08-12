// get the timestamp for 12:01AM for today
export function getTodayTimestamp() {
    const currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(1);
    currentDate.setSeconds(0);

    return currentDate;
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






