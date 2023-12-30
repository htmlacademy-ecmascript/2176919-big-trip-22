import TripPresenter from './presenter/trip-presenter.js';
import WaypointModel from './model/waypoint-model.js';
import { getRandomWaypoint } from './mock/waypoints.js';
import { sortWaypointByPrice } from './utils/utilities.js';

const siteFiltersElement = document.querySelector('.trip-main__trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const waypointModel = new WaypointModel();
const presenter = new TripPresenter({ headerContainer: siteFiltersElement, mainContainer: siteMainElement, waypointModel });
presenter.init();
document.body.addEventListener('click', (evt) => console.log(evt.target))

const waypoints = Array.from({ length: 10 }, getRandomWaypoint);
console.log(waypoints.sort(sortWaypointByPrice))
