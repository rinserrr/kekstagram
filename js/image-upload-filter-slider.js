/* eslint-disable no-console */
/* eslint-disable no-undef */


const initSlider = () => {
  const slider = document.querySelector('.effect-level__slider');
  const sliderContainer = document.querySelector('.img-upload__effect-level');
  const effectLevel = document.querySelector('.effect-level__value');
  const UL = document.querySelector('.effects__list');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');

  let currentEffect;


  sliderContainer.classList.add('hidden');


  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });


  const hideSlider = () => {
    if (imgUploadPreview.classList.contains('none')) {
      sliderContainer.classList.add('hidden');
    } else {
      sliderContainer.classList.remove('hidden');
    }
  };


  const resetSlider = () => {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });
  };


  const onEffectChange = (evt) => {
    imgUploadPreview.classList.remove(`${currentEffect}`);
    currentEffect = evt.target.value;
    imgUploadPreview.classList.add(`${currentEffect}`);

    hideSlider();

    if (currentEffect === 'none') {
      resetSlider();
    }

    if (currentEffect === 'chrome' || currentEffect === 'sepia') {
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }

    if (currentEffect === 'marvin') {
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }

    if (currentEffect === 'phobos') {
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }

    if (currentEffect === 'heat') {
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  };


  slider.noUiSlider.on('update', () => {
    effectLevel.value = slider.noUiSlider.get();

    if (currentEffect === 'none') {
      imgUploadPreview.style.filter = 'none';
    }

    if (currentEffect === 'chrome') {
      imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
    }

    if (currentEffect === 'sepia') {
      imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
    }

    if (currentEffect === 'marvin') {
      imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
    }

    if (currentEffect === 'phobos') {
      imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
    }

    if (currentEffect === 'heat') {
      imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
    }
  });

  UL.addEventListener('change', onEffectChange);
};


export {initSlider};
