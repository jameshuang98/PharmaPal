// get the timestamp for 12:01AM for today
export function getTodayTimestamp() {
    const currentDate = new Date();
    currentDate.setUTCHours(0);
    currentDate.setUTCMinutes(1);
    currentDate.setUTCSeconds(0);

    return Math.floor(currentDate.getTime() / 1000);
}