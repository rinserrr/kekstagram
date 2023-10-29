/* eslint-disable consistent-return */
/* eslint-disable no-console */


import {debounce} from './debounce.js';
import {imageDraw} from './images-draw.js';


const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

let chosenFilter = filterDefault;


const clearPhotos = () => {
  const renderedPhotos = document.querySelectorAll('.picture');
  renderedPhotos.forEach((photo) => {
    photo.remove();
  });
};


const rerenderPhotos = (evt) => {
  clearPhotos();

  if (evt.target === filterDefault) {
    imageDraw(evt.target.id);
  }
  if (evt.target === filterRandom) {
    imageDraw(evt.target.id);
  }
  if (evt.target === filterDiscussed) {
    imageDraw(evt.target.id);
  }
};

const onFilterClick = debounce(rerenderPhotos);

imgFiltersForm.addEventListener('click', onFilterClick);

const highlightFilterButton = (evt) => {
  chosenFilter.classList.remove('img-filters__button--active');
  chosenFilter = evt.target;
  chosenFilter.classList.add('img-filters__button--active');
};

const initFiltering = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', onFilterClick);
  imgFiltersForm.addEventListener('click', highlightFilterButton);
};


export {initFiltering};
