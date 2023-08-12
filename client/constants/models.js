export const emptyPrescription = {
    id: "",
    dailyFrequency: 1,
    dose: 0,
    frequency: 1,
    json: "",
    status: "",
    title: "",
    userId: 1
};

export const statuses = [
    "Active",
    "Paused"
];

export const daysOfWeek = {
    Sunday: 1,      // 2^0
    Monday: 2,      // 2^1
    Tuesday: 4,     // 2^2
    Wednesday: 8,   // 2^3
    Thursday: 16,   // 2^4
    Friday: 32,     // 2^5
    Saturday: 64    // 2^6
  };
