/* eslint-disable no-undef */
/* eslint-disable no-new */
/* eslint-disable no-invalid-this */
/* eslint-disable indent */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {isKeyEnter} from './utils.js';
import {openUserModal, modalPicturesList} from './image-dialog.js';
import {imageUpload} from './image-upload.js';
import {imageUploadValidation} from './image-upload-validation.js';
import {initFiltering} from './filter.js';


const imgUploadInput = document.querySelector('.img-upload__input');


const onModalPicturesListClick = (evt) => {
    if (evt.target.nodeName === 'IMG') {
      openUserModal(evt);
    }
};


modalPicturesList.addEventListener('click', onModalPicturesListClick);


const onmodalPicturesListKeydown = (evt) => {
  if (evt.target.nodeName === 'A') {
    if (isKeyEnter) {
      openUserModal(evt);
    }
  }
};

modalPicturesList.addEventListener('keydown', onmodalPicturesListKeydown);


imgUploadInput.addEventListener('change', function (evt) {
  evt.preventDefault();

  modalPicturesList.removeEventListener('click', onModalPicturesListClick);
  modalPicturesList.removeEventListener('click', onmodalPicturesListKeydown);

  imageUpload(this, evt);
  imageUploadValidation();
});


initFiltering();


export {onModalPicturesListClick, onmodalPicturesListKeydown};
