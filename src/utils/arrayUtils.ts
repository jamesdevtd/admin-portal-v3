export const getSumByKey = (arr: any[], key: string) => {
  return arr.reduce(
    (accumulator, current) => accumulator + Number(current[key]),
    0
  );
};
