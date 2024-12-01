export const insertUnique = (array, item) => {
  if (array.includes(item)) {
    return array;
  }

  return [...array, item];
};
