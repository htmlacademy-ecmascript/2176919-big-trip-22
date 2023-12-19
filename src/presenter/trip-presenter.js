import { render, RenderPosition } from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import Waypoint from '../view/waypoint.js';
import ButtonNewEvent from '../view/button-new-event.js';
export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #waypointModel = null;
  #filters = new Filters();
  #sorting = new Sorting();
  #buttonNewEvent = new ButtonNewEvent();
  #waypoints = [];
  #formEdit = {};
  #waypoint = {};

  constructor({ headerContainer, mainContainer, waypointModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#waypointModel = waypointModel;
  }

  init() {
    this.#waypoints = [...this.#waypointModel.waypoints];
    render(this.#filters, this.#headerContainer);
    render(this.#sorting, this.#mainContainer);
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);
    this.#renderFormEdit(this.#waypoints[0]);
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#renderWaypoint(this.#waypoints[i]);
    }
  }

  #renderWaypoint(waypoints) {
    this.#waypoint = new Waypoint({
      waypoint: waypoints,
      offers: [...this.#waypointModel.getOffersById(waypoints.type, waypoints.offersId)],
      destination: this.#waypointModel.getDestinationsById(waypoints.destination),
    });
    render(this.#waypoint, this.#mainContainer);
  }

  #renderFormEdit(waypoints) {
    this.#formEdit = new FormEdit({
      waypoint: waypoints,
      offersType: this.#waypointModel.getOffersByType(waypoints.type),
      offers: [...this.#waypointModel.getOffersById(waypoints.type, waypoints.offersId)],
      destination: this.#waypointModel.getDestinationsById(waypoints.destination),
      destinationAll: this.#waypointModel.destinations,
    });
    render(this.#formEdit, this.#mainContainer);
  }
}
