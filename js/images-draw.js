/* eslint-disable consistent-return */
/* eslint-disable no-console */


import generateArrayImagesState from './images-generator.js';

generateArrayImagesState();

const images = generateArrayImagesState();
console.log('images : ', images);

// console.log(images[0].url);


export const imageDraw = () => {
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

  images.forEach(({url, likes, comments}) => {
    // Клонируем элемент со всеми "внутренностями"
    const element = template.cloneNode(true);

    // Добавляем порядковый класс, который начинается с единицы, а не с нуля, поэтому 'i + 1'
    element.classList.add('picture');

    // Записываем содержимое
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;

    // Складываем созданные элементы в "коробочку"
    fragment.appendChild(element);
  });

  // И только в конце отрисовываем всё из "коробочки"
  pictures.appendChild(fragment);
};

