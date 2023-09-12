/* eslint-disable indent */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {imageDraw} from './images-draw.js';
import {isKeyEnter} from './utils.js';
import {openUserModal, modalPicturesList} from './image-dialog.js';


imageDraw();


// открытие модалки по клику
modalPicturesList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'IMG') {
    openUserModal(evt);
  }
});


// открытие модалки по Enter
modalPicturesList.addEventListener('keydown', (evt) => {
  if (evt.target.nodeName === 'A') {
    if (isKeyEnter) {
      openUserModal(evt);
    }
  }
});
