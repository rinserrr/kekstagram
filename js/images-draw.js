/* eslint-disable consistent-return */
/* eslint-disable no-console */


import generateArrayImagesState from './images-generator.js';
import {getData} from './api.js';
// import {debounce} from './debounce.js';
// import {shuffle} from './utils.js';


// generateArrayImagesState();

let images = generateArrayImagesState();
// let images;

// console.log('images : ', images);

// console.log(images[0].url);


const imageDraw = (param) => {
  // let images;

  /*
      <!-- Контейнер для изображений от других пользователей -->
      <section class="pictures  container">

      <!-- Шаблон изображения случайного пользователя -->
      <template id="picture">
      <a href="#" class="picture">
        <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
        <p class="picture__info">
          <span class="picture__comments"></span>
          <span class="picture__likes"></span>
        </p>
      </a>
      </template>
  */

  // куда складываем новые элементы
  const pictures = document.querySelector('.pictures');

  // Находим фрагмент с содержимым темплейта
  const templateFragment = document.querySelector('#picture').content;

  // В фрагменте находим нужный элемент
  const template = templateFragment.querySelector('a');

  // Создаём "коробочку"
  const fragment = document.createDocumentFragment();

  // console.log('images : ', images);
  // console.log('param : ', param);


  if (param === 'filter-default') {
    images.forEach(({id, url, likes, comments}) => {
      // Клонируем элемент со всеми "внутренностями"
      const element = template.cloneNode(true);

      // Добавляем класс
      element.classList.add('picture');

      // Записываем содержимое
      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;

      // устанавливаем data-id атрибут на картинку и ссылку
      element.querySelector('img').dataset.id = id;
      // element.dataset.id = id;

      // Складываем созданные элементы в "коробочку"
      fragment.appendChild(element);
    });
  }


  if (param === 'filter-random') {
    const RANDOM_PHOTOS_COUNT = 25;

    // перемешивам элементы в случайном порядке.
    // Он делает это путем перебора массива от конца к началу и для каждого элемента генерирует случайный индекс между 0 и текущим индексом и заменяет элемент с текущим индексом на элемент со случайным индексом. Этот процесс гарантирует, что каждый элемент имеет равные шансы быть помещенным в любую позицию перетасованного массива.
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // возвращаем новый массив, состоящий из случайно выбранных элементов photo
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

    console.log('sortedImages : ', sortedImages);

    sortedImages.forEach(({id, url, likes, comments}) => {
      // Клонируем элемент со всеми "внутренностями"
      const element = template.cloneNode(true);

      // Добавляем класс
      element.classList.add('picture');

      // Записываем содержимое
      element.querySelector('.picture__img').src = url;
      element.querySelector('.picture__comments').textContent = comments.length;
      element.querySelector('.picture__likes').textContent = likes;

      // устанавливаем data-id атрибут на картинку и ссылку
      element.querySelector('img').dataset.id = id;
      // element.dataset.id = id;

      // Складываем созданные элементы в "коробочку"
      fragment.appendChild(element);
    });
  }

  // И только в конце отрисовываем всё из "коробочки"
  pictures.appendChild(fragment);
};


const imageDrawClear = () => {
  // куда складываем новые элементы
  const pictures = document.querySelector('.pictures');

  // массивы ссылок
  const linkArr = pictures.querySelectorAll('a');

  linkArr.forEach((item) => {
    item.textContent = '';
  });
};


(async function () {
  try {
    images = await getData();
    imageDraw('filter-default'); // вызываем функцию после получения данных
    // console.log('images : ', images);
  } catch (e) {
    console.error(e);
  }
})();


//
//
//
// const imgFilters = document.querySelector('.img-filters');
// const filterDefault = imgFilters.querySelector('#filter-default');
// const filterRandom = imgFilters.querySelector('#filter-random');
// const filterDiscussed = imgFilters.querySelector('#filter-discussed');
// const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

// let chosenFilter = filterDefault;


// const clearPhotos = () => {
//   const renderedPhotos = document.querySelectorAll('.picture');
//   renderedPhotos.forEach((photo) => {
//     photo.remove();
//   });
// };


// const rerenderPhotos = (evt) => {
//   clearPhotos();

//   if (evt.target === filterDefault) {
//     console.log('filterDefault');
//     imageDraw(evt.target.id);
//   }
//   if (evt.target === filterRandom) {
//     console.log('filterRandom');
//     imageDraw(evt.target.id);
//   }
//   if (evt.target === filterDiscussed) {
//     console.log('filterDiscussed');
//     imageDraw(evt.target.id);
//   }
// };

// const onFilterClick = debounce(rerenderPhotos);

// imgFiltersForm.addEventListener('click', onFilterClick);

// const highlightFilterButton = (evt) => {
//   chosenFilter.classList.remove('img-filters__button--active');
//   chosenFilter = evt.target;
//   chosenFilter.classList.add('img-filters__button--active');
// };

// const initFiltering = () => {
//   imgFilters.classList.remove('img-filters--inactive');
//   imgFiltersForm.addEventListener('click', onFilterClick);
//   imgFiltersForm.addEventListener('click', highlightFilterButton);
// };

// // rerenderPhotos();
// initFiltering();


export {imageDrawClear, images, imageDraw};
