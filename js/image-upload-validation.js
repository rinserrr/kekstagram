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
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'did',
  errorTextClass: 'form__error',
});


const list = (value) => value.split(' ').filter(Boolean);


const itemPatternMessage = (value) => {
  const pristinePattern = /^#[a-zа-яё0-9]+$/i;
  const items = list(value);

  return items.every((item) => pristinePattern.test(item));
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemPatternMessage, 'С начала #, потом буквы / цифры');


const itemUniqueHashTag = (value) => {
  const items = list(value).map((item) => item.toLowerCase());

  return new Set(items).size === items.length;
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemUniqueHashTag, 'Нельзя повторяться');


const itemLimit = (value) => {
  const maxlength = 5;
  const items = list(value);

  return items.length <= maxlength;
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemLimit, 'Не более 5 тэгов');


const itemMaxLength = (value) => {
  const maxlength = 20;
  const items = list(value);

  return items.every((item) => item.length <= Number(maxlength));
};
pristine.addValidator(imgUploadForm.querySelector('#hashtags'), itemMaxLength, 'Не больше 20 символов на #ХэшТег');


const validateDescription = (value) => {
  return value.length <= 140;
};
pristine.addValidator(imgUploadForm.querySelector('#text__description'), validateDescription, 'До 140 символов');


const closeImageUpload = () => {
  imgUploadOverlay.classList.add('hidden');

  const imgUploaPreviewIMG = document.querySelector('.img-upload__preview img');
  if (imgUploaPreviewIMG) {
    imgUploaPreviewIMG.parentNode.removeChild(imgUploaPreviewIMG);
  }

  modalPicturesList.addEventListener('click', onModalPicturesListClick);
  modalPicturesList.addEventListener('keydown', onmodalPicturesListKeydown);
};


const imageUploadValidation = () => {
  sendButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(imgUploadForm)
        .then((response) => {
          console.log('Отправка успешна', response);

          closeImageUpload();
          uploadValidationMessage();

          document.querySelector('.success__button').addEventListener('click', () => {
            document.querySelector('.success').classList.add('hidden');
          });
        })
        .catch((error) => console.error('Отправка не успешна!!!', error))
        .finally(() => {
          sendButton.disabled = true;
        });

    } else {
      console.log('Форма невалидна');
    }
  });


  const myInput = document.querySelector('#hashtags');
  const mydescription = document.querySelector('.text__description');

  const validateHashtagInput = (evt) => {
    if (isKeyEscape(evt) && evt.target.tagName !== 'INPUT') {
      closeImageUpload();
    }
  };

  myInput.addEventListener('focus', (evt) => {
    evt.stopPropagation();
    document.addEventListener('keydown', validateHashtagInput);
  });

  myInput.addEventListener('blur', () => {
    document.removeEventListener('keydown', validateHashtagInput);
  });

  document.addEventListener('keydown', (evt) => {
    if (isKeyEscape(evt) && !myInput.contains(evt.target) && !mydescription.contains(evt.target)) {
      closeImageUpload();
    }
  });


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

  imgUploadCancel.addEventListener('click', closeImageUpload);

  imgUploadCancel.addEventListener('keydown', (evt) => {
    if (isKeyEnter(evt)) {
      closeImageUpload();
    }
  });
};


const uploadValidationMessage = () => {
  const body = document.querySelector('body');
  const templateFragment = document.querySelector('#success').content;
  const template = templateFragment.querySelector('section');
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
};


export {imageUploadValidation};
