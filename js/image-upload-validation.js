/* eslint-disable no-undef */
/* eslint-disable no-new */
/* eslint-disable no-invalid-this */
/* eslint-disable indent */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {modalPicturesList} from './image-dialog.js';
import {onModalPicturesListClick, onmodalPicturesListKeydown} from './main.js';
import {isKeyEnter, isKeyEscape} from './utils.js';
import {sendData} from './api.js';


const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const sendButton = imgUploadForm.querySelector('.img-upload__submit');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'form__item', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'did', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error', // Класс для элемента с текстом ошибки
});


// хэш-теги разделяются пробелами;
const list = (value) => value.split(' ').filter(Boolean);


// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать
// пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
const itemPatternMessage = (value) => {
  const pristinePattern = /^#[a-zа-яё0-9]+$/i;
  const items = list(value);

  // Метод .every() позволяет решить задачу, когда необходимо узнать, что все элементы в массиве соответствуют условию. Метод, по сути, противоположен .some(). В .every(), чтобы результат выражения стал true, необходимо, чтобы все элементы удовлетворяли условию функции-предиката.
  return items.every((item) => pristinePattern.test(item));
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemPatternMessage, 'С начала #, потом буквы / цифры');


// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// один и тот же хэш-тег не может быть использован дважды;
const itemUniqueHashTag = (value) => {
  // console.log(list(value));

  const items = list(value).map((item) => item.toLowerCase());

  return new Set(items).size === items.length;
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemUniqueHashTag, 'Нельзя повторяться');


// нельзя указать больше 5 хэш-тегов;
const itemLimit = (value) => {
  const maxlength = 5;
  const items = list(value);

  return items.length <= maxlength;
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemLimit, 'Не более 5 тэгов');


// максимальная длина одного хэш-тега 20 символов, включая решётку;
const itemMaxLength = (value) => {
  const maxlength = 20;
  const items = list(value);

  return items.every((item) => item.length <= Number(maxlength));
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemMaxLength, 'Не больше 20 символов на #ХэшТег');


// длина комментария не может составлять больше 140 символов
const validateDescription = (value) => {
  // return true;
  return value.length <= 140;
};
pristine.addValidator(imgUploadForm.querySelector('#text__description'), validateDescription, 'До 140 символов');


const closeImageUpload = () => {
  imgUploadOverlay.classList.add('hidden');

  const imgUploaPreviewIMG = document.querySelector('.img-upload__preview img');
  if (imgUploaPreviewIMG) {
    imgUploaPreviewIMG.parentNode.removeChild(imgUploaPreviewIMG);
  }

  // открытие модалки по клику
  modalPicturesList.addEventListener('click', onModalPicturesListClick);
  // открытие модалки по Enter
  modalPicturesList.addEventListener('keydown', onmodalPicturesListKeydown);
};


const imageUploadValidation = () => {

  // imgUploadForm.addEventListener('submit', (evt) => {
  //   evt.preventDefault();

  //   const isValid = pristine.validate();
  //   if (isValid) {
  //     console.log('Можно отправлять');
  //     evt.currentTarget.submit();

  //   } else {
  //     console.log('Форма невалидна');
  //   }
  // });


  // imgUploadForm.addEventListener('submit', (evt) => {
  //   evt.preventDefault();

  //   const isValid = pristine.validate();
  //   if (isValid) {
  //     console.log('Можно отправлять');

  //     // Create a FormData object and append form data
  //     const formData = new FormData(imgUploadForm);

  //     // Send the form data to the server using fetch
  //     fetch('https://27.javascript.pages.academy/kekstagram', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //     .then((response) => {
  //       if (response.ok) {
  //         // Call the uploadValidationMessage function
  //         closeImageUpload();
  //         uploadValidationMessage();

  //         document.querySelector('.success__button').addEventListener('click', () => {
  //           document.querySelector('.success').classList.add('hidden');

  //           location.reload();
  //         });
  //       } else {
  //         console.log('Server Error');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Request Failed', error);
  //     });
  //   } else {
  //     console.log('Форма невалидна');
  //   }
  // });


  sendButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    // sendButton.disabled = true; // block the button
    // sendButton.disabled = true; // block the button

    const isValid = pristine.validate();
    if (isValid) {
      console.log('Можно отправлять');
      // evt.currentTarget.submit();

      sendData(imgUploadForm)
        .then((response) => {
          console.log('Отправка успешна', response);

          closeImageUpload();
          uploadValidationMessage();

          document.querySelector('.success__button').addEventListener('click', () => {
            document.querySelector('.success').classList.add('hidden');

            location.reload();
          });
        })
        .catch((error) => console.error('Отправка не успешна!!!', error))
        .finally(() => {
          // sendButton.disabled = false; // unblock the button
          sendButton.disabled = true;
        });

    } else {
      console.log('Форма невалидна');
    }
  });


  // закрытие формы
  const myInput = document.querySelector('#hashtags');
  const mydescription = document.querySelector('.text__description');

  const validateHashtagInput = (evt) => {
    if (isKeyEscape(evt) && evt.target.tagName !== 'INPUT') {
      closeImageUpload();
    }
  };

  // обработчик "закрытия по ESC" добавляется при фокусе на поле ввода
  myInput.addEventListener('focus', (evt) => {
    evt.stopPropagation();
    document.addEventListener('keydown', validateHashtagInput);
  });

  // обработчик "закрытия по ESC" удаляется при потере фокуса
  myInput.addEventListener('blur', () => {
    document.removeEventListener('keydown', validateHashtagInput);
  });

  // Добавлен обработчик закрытия формы по Esc на document.
  // проверяется, что фокус не находится на поле ввода хэштегов (проверка через contains).
  document.addEventListener('keydown', (evt) => {
    if (isKeyEscape(evt) && !myInput.contains(evt.target) && !mydescription.contains(evt.target)) {
      closeImageUpload();
    }
  });


  // DESCRIPTION
  const validateDescriptionInput = (evt) => {
    if (isKeyEscape(evt) && evt.target.tagName !== 'TEXTAREA') {
      closeImageUpload();
    }
  };

  mydescription.addEventListener('focus', (evt) => {
    evt.stopPropagation();
    document.addEventListener('keydown', validateDescriptionInput);
  });

  mydescription.addEventListener('blur', () => {
    document.removeEventListener('keydown', validateDescriptionInput);
  });


  // закрытие кнопки
  imgUploadCancel.addEventListener('click', closeImageUpload);

  imgUploadCancel.addEventListener('keydown', (evt) => {
    if (isKeyEnter(evt)) {
      closeImageUpload();
    }
  });
};


const uploadValidationMessage = () => {
  // куда складываем новые элементы
  const body = document.querySelector('body');

  // Находим фрагмент с содержимым темплейта
  const templateFragment = document.querySelector('#success').content;

  // В фрагменте находим нужный элемент
  const template = templateFragment.querySelector('section'); // <div>.......
  // console.log(template);

  // Создаём "коробочку"
  const fragment = document.createDocumentFragment();

  // Клонируем элемент со всеми "внутренностями"
  const element = template.cloneNode(true);

  // Складываем созданные элементы в "коробочку"
  fragment.appendChild(element);

  // И только в конце отрисовываем всё из "коробочки"
  body.appendChild(fragment);
};


export {imageUploadValidation};
