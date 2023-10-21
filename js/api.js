// // @ts-ignore
// // @ts-nocheck

// /* tslint:disable */
// /* eslint:disable */
// /* eslint-disable no-console */
// /* eslint-disable indent */


/* eslint-disable */
// alert('suppress all warnings between comments')
/* eslint-enable */

/* eslint-disable eqeqeq */
// alert('suppress specific warning eg eqeqeq between comments')
/* eslint-enable eqeqeq */


// ###################### 1
//
// В данном коде ошибка заключается в том, что функция getData возвращает промис, а не сам массив данных.
// Поэтому при выводе в консоль в файле images-draw.js мы получаем не массив данных, а промис.
//
// Чтобы исправить эту ошибку, нужно использовать метод .then() для обработки данных, которые вернет функция getData().
// Например, можно изменить код в файле images-draw.js следующим образом:
//
// import {getData} from './api.js';
//
// getData()
//   .then((images) => {
//     console.log('images : ', images);
//   })
//   .catch((e) => {
//     console.error(e);
//   });
//
// Теперь мы используем метод .then() для обработки данных, которые вернет функция getData().
// Внутри метода .then() мы получаем массив данных и выводим его в консоль. Если произойдет ошибка, мы ее обработаем с помощью метода .catch().
//
// const getData = () => {
//   fetch('https://27.javascript.pages.academy/kekstagram/data')
//     .then((response) => response.json())
//     .then((photos) => {
//       console.log(photos);
//     })
//     .catch((e) => {
//       console.error(e);
//     });
// };


// ###################### 2
//
// Для того чтобы функция getData() возвращала массив данных, а не промис, нужно внести следующие изменения:
//
// 1. Убрать из функции getData() вызов метода json(), который преобразует ответ сервера в объект JavaScript.
// Вместо этого сразу вернуть ответ сервера с помощью ключевого слова return.
//
// 2. В файле api.js изменить объявление функции getData() на async/await функцию, так как мы будем использовать метод fetch() для получения данных с сервера.
//
// 3. В файле images-draw.js вызывать функцию getData() без использования метода .then(), так как теперь она возвращает массив данных.
//
// Измененный код будет выглядеть следующим образом:
//
// // api.js
// export async function getData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/photos');
//   return response.json();
// }
//
// // images-draw.js
// import {getData} from './api.js';
//
// (async function() {
//   try {
//     const images = await getData();
//     console.log('images : ', images);
//   } catch (e) {
//     console.error(e);
//   }
// })();
//
// Теперь функция getData() возвращает массив данных, который мы получаем с помощью ключевого слова await. В файле images-draw.js мы вызываем функцию getData() с помощью ключевого слова await внутри асинхронной функции, которую сразу вызываем. Если произойдет ошибка, мы ее обработаем с помощью конструкции try/catch.


// async function getData() {
//   const response = await fetch('https://27.javascript.pages.academy/kekstagram/data');
//   return response.json();
// }


const getData = async () => {
  const response = await fetch('https://27.javascript.pages.academy/kekstagram/data');
  return response.json();
};


export {getData};
