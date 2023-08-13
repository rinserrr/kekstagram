/* eslint-disable consistent-return */
/* eslint-disable no-console */


const ARRAY_MIN_COUNT = 1;
const ARRAY_MAX_COUNT = 25;
const AVATAR_RANGE = [1, 6];
const COMMENTS_RANGE = [1, 25];
const LIKES_RANGE = [15, 200];
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон', 'Эмма'];

const DESCRIPTIONS = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4',
  'описание 5',
  'описание 6',
  'описание 7',
  'описание 8',
  'описание 9'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const getRandomInt = (min, max) => {
  const range = [min, max];

  if (!range.every(Number.isInteger)) {
    throw new Error(`Нецелочисленный диапазон: [${range}]`);
  }

  if (min < 0 || max < 0 || min > max) {
    throw new Error(`Неподдерживаемый диапазон: [${range}]`);
  }

  return Math.round((max - min) * Math.random() + min);
};


const generateIdClosure = (min, max) => {
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


const getRandomArrayItem = (items) => {
  const lastIndex = Math.max(0, items.length - 1);
  const index = getRandomInt(0, lastIndex);

  return items[index];
};


const generateId1 = generateIdClosure(ARRAY_MIN_COUNT, ARRAY_MAX_COUNT);
const generateId2 = generateIdClosure(ARRAY_MIN_COUNT, ARRAY_MAX_COUNT);
// const generateId3 = generateIdClosure(ARRAY_MIN_COUNT, ARRAY_MAX_COUNT);

// 1
// let arrTMP1 = [];
// for (let i = 0; arrTMP1.length < ARRAY_MAX_COUNT; i++) {
//   arrTMP1[i] = generateId1();
// }
// console.log(arrTMP1);

// 2
// const arrTMP2 = (num) => {
//   return Array.from({length: num}, () => generateId2()).filter((el) => el !== 'undefined');
// };
// console.log(arrTMP2(ARRAY_MAX_COUNT));

// 3
// let arrTMP3 = Array.from({length: ARRAY_MAX_COUNT}, () => generateId3()).filter((el) => el !== 'undefined');
// console.log(arrTMP3);


const genComment = (id) => ({
  id: `${id}`,
  avatar: `img/avatar-${getRandomInt(...AVATAR_RANGE)}.svg`,
  message: getRandomArrayItem(MESSAGES),
  names: getRandomArrayItem(NAMES),
});

const genArrayComments = (num) => {
  return Array.from({length: num}, (_, index) => genComment(index + 1));
};
// console.log(genArrayComments(getRandomInt(ARRAY_MIN_COUNT, ARRAY_MAX_COUNT)));


const generateImage = () => ({
  id: `${generateId1()}`,
  url: `photos/${generateId2()}.jpg`,
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInt(...LIKES_RANGE),
  comments: genArrayComments(getRandomInt(...COMMENTS_RANGE)),
});

const generateArrayImages = () => Array.from({length: ARRAY_MAX_COUNT}, () => generateImage());
console.log(generateArrayImages());
