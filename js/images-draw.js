/* eslint-disable consistent-return */
/* eslint-disable no-console */


import generateArrayImagesState from './images-generator.js';
import {getData} from './api.js';


let images = generateArrayImagesState();


const imageDraw = (param) => {
  const pictures = document.querySelector('.pictures');
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();

  if (param === 'filter-default') {
    images.forEach(({id, url, likes, comments}) => {
      const element = template.cloneNode(true);
      element.classList.add('picture');
      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;
      element.querySelector('img').dataset.id = id;
      fragment.appendChild(element);
    });
  }


  if (param === 'filter-random') {
    const RANDOM_PHOTOS_COUNT = 25;

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const getRandomPhotos = (photo) => {
      const photosArrayCopy = photo.slice();
      shuffle(photosArrayCopy);
      return photosArrayCopy.slice(0, RANDOM_PHOTOS_COUNT);
    };

    getRandomPhotos(images).forEach(({id, url, likes, comments}) => {
      const element = template.cloneNode(true);
      element.classList.add('picture');
      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;
      element.querySelector('img').dataset.id = id;
      fragment.appendChild(element);
    });
  }


  if (param === 'filter-discussed') {
    const compareCommentsNumber = (a, b) => b.comments.length - a.comments.length;
    const sortByCommentsNumber = () => images.slice().sort(compareCommentsNumber);

    const sortedImages = sortByCommentsNumber(images);
    sortedImages.forEach(({id, url, likes, comments}) => {
      const element = template.cloneNode(true);
      element.classList.add('picture');
      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;
      element.querySelector('img').dataset.id = id;
      fragment.appendChild(element);
    });
  }

  pictures.appendChild(fragment);
};


const imageDrawClear = () => {
  const pictures = document.querySelector('.pictures');
  const linkArr = pictures.querySelectorAll('a');

  linkArr.forEach((item) => {
    item.textContent = '';
  });
};


(async function () {
  try {
    images = await getData();
    imageDraw('filter-default');
  } catch (e) {
    console.error(e);
  }
})();


export {imageDrawClear, images, imageDraw};
