import moment from 'moment';

export function objectDatesToString(object: any) {
  let convertedDates = {};
  Object.entries(object).forEach(([key, value]) => {
    if (value instanceof Date) {
      const dateItem = { [key]: moment(value).toISOString() };
      convertedDates = { ...convertedDates, ...dateItem };
    }
  });
  return convertedDates;
}

export function objectStringsToDates(object: any) {
  let convertedDates = {};
  Object.entries(object).forEach(([key, value]) => {
    if (value) {
      const parsed = moment(value as string).isValid();
      if (parsed) {
        const dateItem = { [key]: moment(value as string).toDate() };
        convertedDates = { ...convertedDates, ...dateItem };
      }
    }
  });
  return convertedDates;
}

export function removeNullElements(object: any) {
  Object.keys(object).forEach((key) => {
    if (object[key] === null) {
      delete object[key];
    }
  });
  return object;
}

export function sleeper(ms: number | undefined) {
  return function (x: unknown) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}
