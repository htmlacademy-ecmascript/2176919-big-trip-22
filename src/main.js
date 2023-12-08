import {render} from './render.js';
import FormEdit from './view/form-edit.js';
import Filters from './view/filters.js';
import Sorting from './view/sorting.js';
import FormCreation from './view/form-creation.js';
import Waypoint from './view/waypoint.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.body.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

render(new FormEdit(), siteMainElement);
render(new Filters(), siteTripMainElement);
render(new Sorting(), siteTripEventsElement);
render(new FormCreation(), siteTripEventsElement);
render(new Waypoint(), siteTripEventsElement);
render(new Waypoint(), siteTripEventsElement);
render(new Waypoint(), siteTripEventsElement);
