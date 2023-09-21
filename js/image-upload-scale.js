import {imageUploadFilter} from './image-upload-filter.js';


const imageUploadScale = () => {
  const scaleControSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  let scaleControl = document.querySelector('.scale__control--value');
  let imgUploadPreviewScale = document.querySelector('.img-upload__preview img');
  let scaleControlValue = 50;
  scaleControl.value = `${scaleControlValue}%`;
  imgUploadPreviewScale.style.transform = `scale(${scaleControlValue / 100})`;


  scaleControSmaller.addEventListener('click', () => {
    scaleControlValue -= 25;
    scaleControl.value = `${scaleControlValue}%`;
    scaleControlBigger.disabled = false;

    imgUploadPreviewScale.style.transform = `scale(${scaleControlValue / 100})`;

    if (scaleControlValue <= 25) {
      scaleControSmaller.disabled = true;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    scaleControlValue += 25;
    scaleControl.value = `${scaleControlValue}%`;
    scaleControSmaller.disabled = false;

    imgUploadPreviewScale.style.transform = `scale(${scaleControlValue / 100})`;

    if (scaleControlValue >= 100) {
      scaleControlBigger.disabled = true;
    }
  });


  imageUploadFilter();
};


export {imageUploadScale};
