const imageUploadFilter = () => {
  const UL = document.querySelector('.effects__list');
  let imgUploadPreviewScale = document.querySelector('.img-upload__preview img');

  const ulClick = (evt) => {
    if (evt.target.classList.contains('effects__preview--none')) {
      imgUploadPreviewScale.style.filter = '';
    }

    if (evt.target.classList.contains('effects__preview--chrome')) {
      imgUploadPreviewScale.style.filter = 'grayscale(0.5)';
    }

    if (evt.target.classList.contains('effects__preview--sepia')) {
      imgUploadPreviewScale.style.filter = 'sepia(0.5)';
    }

    if (evt.target.classList.contains('effects__preview--marvin')) {
      imgUploadPreviewScale.style.filter = 'invert(90%)';
    }

    if (evt.target.classList.contains('effects__preview--phobos')) {
      imgUploadPreviewScale.style.filter = 'blur(2.5px)';
    }

    if (evt.target.classList.contains('effects__preview--heat')) {
      imgUploadPreviewScale.style.filter = 'brightness(2)';
    }
  };


  UL.addEventListener('click', ulClick);
};


export {imageUploadFilter};
