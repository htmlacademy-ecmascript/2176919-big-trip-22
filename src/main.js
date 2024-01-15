import TripPresenter from './presenter/trip-presenter.js';
import WaypointModel from './model/waypoint-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';

const siteFiltersElement = document.querySelector('.trip-main__trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const waypointModel = new WaypointModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

const presenter = new TripPresenter({ headerContainer: siteFiltersElement, mainContainer: siteMainElement, waypointModel, offersModel, destinationModel });
presenter.init();
