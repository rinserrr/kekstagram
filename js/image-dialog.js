/* eslint-disable indent */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {images} from './images-draw.js';
import {isKeyEnter, isKeyEscape} from './utils.js';


let loadedComments = 0;
let remainingComments = 0;
let commentsToLoad = 0;


const modalPicturesList = document.querySelector('.pictures');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');


const imageDescription = (id) => {
  images.find((item) => {
    if (item.id === id) {
      document.querySelector('.social__caption').textContent = item.description;
      document.querySelector('.likes-count').textContent = item.likes;
      document.querySelector('body').classList.add('modal-open');
    }
  });
};


const createCommentElement = (comment) => {
  const templateFragment = document.querySelector('#pictureComment').content;
  const template = templateFragment.querySelector('li');
  const element = template.cloneNode(true);
  element.classList.add('social__comment');
  element.querySelector('.social__picture').src = comment.avatar;
  element.querySelector('.social__picture').alt = comment.names;
  element.querySelector('.social__text').textContent = comment.message;
  return element;
};


const openUserModal = (evt) => {
  bigPictureModal.classList.remove('hidden');
  bigPictureModal.setAttribute('tabindex', '0');
  bigPictureModal.focus();

  const bigPictureModalSRC = bigPictureModal.querySelector('img');
  bigPictureModalSRC.src = evt.target.src;

  document.querySelector('.social__comments-loader').classList.remove('hidden');

  const idImage = Number(evt.target.dataset.id);
  imageDescription(idImage);

  const pictures = document.querySelector('.social__comments');
  pictures.textContent = '';

  const commentsSize = images.find((image) => image.id === idImage).comments.length;
  const commentsCount = document.querySelector('.comments-count');
  let commentsCountMin = document.querySelector('.comments-count-min');
  commentsCount.textContent = commentsSize;
  loadedComments = 0;

  commentsToLoad = Math.min(commentsSize, 5);

  for (let i = loadedComments; i < loadedComments + commentsToLoad; i++) {
    if (i >= commentsSize) {
      break;
    }
    const commentElement = createCommentElement(images.find((item) => item.id === idImage).comments[i]);
    pictures.append(commentElement);
  }

  loadedComments += commentsToLoad;

 if (commentsToLoad >= commentsSize) {
    commentsCountMin.textContent = loadedComments;
    document.querySelector('.social__comments-loader').classList.add('hidden');
  }

  commentsCountMin.textContent = loadedComments;

  document.querySelector('.social__comments-loader').addEventListener('click', () => {
    showComments(idImage, pictures, commentsSize, commentsCountMin);
  });

  closeUserModal();
};


const showComments = (idImage, pictures, commentsSize, commentsCountMin) => {
  remainingComments = commentsSize - loadedComments;
  commentsToLoad = Math.min(remainingComments, 5);

  for (let i = loadedComments; i < loadedComments + commentsToLoad; i++) {
    if (i >= commentsSize) {
      break;
    }
    const commentElement = createCommentElement(images.find((item) => item.id === idImage).comments[i]);
    pictures.append(commentElement);
  }

  loadedComments += commentsToLoad;
  commentsCountMin.textContent = loadedComments;

  if (loadedComments >= commentsSize) {
    document.querySelector('.social__comments-loader').classList.add('hidden');
  }
};


const clsComments = () => {
  loadedComments = 0;
  remainingComments = 0;
  commentsToLoad = 0;

  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  location.reload();
};


const closeUserModal = () => {
  bigPictureModalClose.addEventListener('click', () => {
    clsComments();
  });

  bigPictureModalClose.addEventListener('keydown', (evt) => {
    if (isKeyEnter(evt)) {
      clsComments();
    }
  });

  bigPictureModal.addEventListener('keydown', (evt) => {
    if (isKeyEscape(evt)) {
      evt.preventDefault();
      clsComments();
    }
  });
};


export {openUserModal, modalPicturesList};
