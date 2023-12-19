import { render } from '../framework/render.js';
import FormEdit from '../view/form-edit.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import Waypoint from '../view/waypoint.js';
export default class TripPresenter {
  constructor({ headerContainer, mainContainer, waypointModel }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    this.waypoints = [...this.waypointModel.getWaypoints()];

    const filters = new Filters();
    render(filters, this.headerContainer);

    const sorting = new Sorting();
    render(sorting, this.mainContainer);

    const formEdit = new FormEdit({
      waypoint: this.waypoints[0],
      offersType: this.waypointModel.getOffersByType(this.waypoints[0].type),
      offers: [...this.waypointModel.getOffersById(this.waypoints[0].type, this.waypoints[0].offersId)],
      destination: this.waypointModel.getDestinationsById(this.waypoints[0].destination),
      destinationAll: this.waypointModel.getDestinations(),
    });
    render(formEdit, this.mainContainer);

    for (let i = 0; i < this.waypoints.length; i++) {
      const waypoint = new Waypoint({
        waypoint: this.waypoints[i],
        offers: [...this.waypointModel.getOffersById(this.waypoints[i].type, this.waypoints[i].offersId)],
        destination: this.waypointModel.getDestinationsById(this.waypoints[i].destination),
      });
      render(waypoint, this.mainContainer);
    }
  }
}
