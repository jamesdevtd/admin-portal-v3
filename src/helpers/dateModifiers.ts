export const setNextDay = (date: Date) => {
  if (date !== null) {
    const nextDate = new Date(date.getTime());
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  } else {
    return date;
  }
};

export const setDayBefore = (date: Date) => {
  if (date !== null) {
    const prevDate = new Date(date.getTime());
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate;
  } else {
    return date;
  }
};
