import TripPresenter from './presenter/trip-presenter.js';
import WaypointModel from './model/waypoint-model.js';

const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const waypointModel = new WaypointModel();
const presenter = new TripPresenter({ headerContainer: siteFiltersElement, mainContainer: siteMainElement, waypointModel });
presenter.init();

