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


const genComment = (id) => ({
  id: `${id}`,
  avatar: `img/avatar-${getRandomInt(...AVATAR_RANGE)}.svg`,
  message: getRandomArrayItem(MESSAGES),
  names: getRandomArrayItem(NAMES),
});


const genArrayComments = (num) => {
  return Array.from({length: num}, (_, index) => genComment(index + 1));
};


const generateImage = () => ({
  id: generateId1(),
  url: `photos/${generateId2()}.jpg`,
  description: getRandomArrayItem(DESCRIPTIONS),
  likes: getRandomInt(...LIKES_RANGE),
  comments: genArrayComments(getRandomInt(...COMMENTS_RANGE)),
});


const generateArrayImagesState = (() => {
  const generatedImages = Array.from({length: ARRAY_MAX_COUNT}, () => generateImage());

  return () => {
    return generatedImages;
  };
})();


export default generateArrayImagesState;
