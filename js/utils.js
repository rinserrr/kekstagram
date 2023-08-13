/* eslint-disable consistent-return */
/* eslint-disable no-console */


export const getRandomInt = (min, max) => {
  const range = [min, max];

  if (!range.every(Number.isInteger)) {
    throw new Error(`Нецелочисленный диапазон: [${range}]`);
  }

  if (min < 0 || max < 0 || min > max) {
    throw new Error(`Неподдерживаемый диапазон: [${range}]`);
  }

  return Math.round((max - min) * Math.random() + min);
};


export const generateIdClosure = (min, max) => {
  const checkGeneratedId = [];

  const generateId = () => {
    while (checkGeneratedId.length < max) {
      const id = getRandomInt(min, max);

      // если получаемый id отсутствует в массиве, добавляем в конец
      if (!checkGeneratedId.includes(id)) {
        checkGeneratedId.push(id);

        return id;
      }
    }
  };

  return generateId;
};


export const getRandomArrayItem = (items) => {
  const lastIndex = Math.max(0, items.length - 1);
  const index = getRandomInt(0, lastIndex);

  return items[index];
};
