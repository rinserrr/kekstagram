/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {
  ARRAY_MIN_COUNT,
  ARRAY_MAX_COUNT,
  AVATAR_RANGE,
  COMMENTS_RANGE,
  LIKES_RANGE,
  NAMES,
  DESCRIPTIONS,
  MESSAGES
} from './data.js';


import {getRandomInt, generateIdClosure, getRandomArrayItem} from './utils.js';


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
  id: generateId1(),
  url: `photos/${generateId2()}.jpg`,
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInt(...LIKES_RANGE),
  comments: genArrayComments(getRandomInt(...COMMENTS_RANGE)),
});


// const generateArrayImages = () => Array.from({length: ARRAY_MAX_COUNT}, () => generateImage());


// кешируем выводимый объект
const generateArrayImagesState = (() => {
  const generatedImages = Array.from({length: ARRAY_MAX_COUNT}, () => generateImage());

  return () => {
    return generatedImages;
  };
})();


export default generateArrayImagesState;
