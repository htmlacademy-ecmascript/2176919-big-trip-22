import TripPresenter from './presenter/trip-presenter.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const presenter = new TripPresenter (siteFiltersElement, siteMainElement);
presenter.init();
