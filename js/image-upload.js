/* eslint-disable no-invalid-this */

import {imageUploadScale} from './image-upload-scale.js';
import {initSlider} from './image-upload-filter-slider.js';


const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploaPreview = document.querySelector('.img-upload__preview');
const effectsPreview = document.querySelectorAll('.effects__preview');


const imageUpload = (input, evt) => {
  evt.preventDefault();
  const reader = new FileReader();
  const image = new Image();
  let uploadedImage = '';

  imgUploadOverlay.classList.remove('hidden');

  reader.addEventListener('load', () => {
    uploadedImage = reader.result;

    image.src = uploadedImage;
    image.alt = 'Предварительный просмотр фотографии';
    imgUploaPreview.append(image);

    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${uploadedImage})`;
    });

    imageUploadScale();
    initSlider();
  });

  reader.readAsDataURL(input.files[0]);
};


export {imageUpload};
