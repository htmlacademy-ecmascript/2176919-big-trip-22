import { render } from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import Waypoint from '../view/waypoint.js';
export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #waypointModel = null;
  #filters = new Filters();
  #sorting = new Sorting();
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
    this.#formEdit = new FormEdit({
      waypoint: this.#waypoints[0],
      offersType: this.#waypointModel.getOffersByType(this.#waypoints[0].type),
      offers: [...this.#waypointModel.getOffersById(this.#waypoints[0].type, this.#waypoints[0].offersId)],
      destination: this.#waypointModel.getDestinationsById(this.#waypoints[0].destination),
      destinationAll: this.#waypointModel.destinations,
    });
    render(this.#filters, this.#headerContainer);
    render(this.#sorting, this.#mainContainer);
    render(this.#formEdit, this.#mainContainer);
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#waypoint = new Waypoint({
        waypoint: this.#waypoints[i],
        offers: [...this.#waypointModel.getOffersById(this.#waypoints[i].type, this.#waypoints[i].offersId)],
        destination: this.#waypointModel.getDestinationsById(this.#waypoints[i].destination),
      });
      render(this.#waypoint, this.#mainContainer);
    }
  }
}
