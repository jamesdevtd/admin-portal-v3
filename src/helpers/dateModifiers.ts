import moment from 'moment';

export const getNextDay = (date: Date) => {
  const nextDate = new Date(date.getTime());
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate;
};

export const getPrevDay = (date: Date) => {
  const prevDate = new Date(date.getTime());
  prevDate.setDate(prevDate.getDate() - 1);
  return prevDate;
};

// Get next month's 13th day, accepts any date from a datepicker
export const getNextMonth13 = (date: Date) => {
  const d = new Date(date.setMonth(date.getMonth() + 1, 13));
  return d;
};

// Convert month to next month if current day is 7th or later
// this accepts any month value (0-122)
export const getEligibleEventMonth = (month: number) => {
  return moment().date() >= 7 ? month : ++month;
};
