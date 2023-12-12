import { render } from '../render.js';
import FormEdit from '../view/form-edit.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import FormCreation from '../view/form-creation.js';
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

    const formEdit = new FormEdit();
    render(formEdit, this.mainContainer);

    const formCreation = new FormCreation();
    render(formCreation, this.mainContainer);

    for (let i = 0; i < this.waypoints.length; i++) {
      const waypoint = new Waypoint({ waypoint: this.waypoints[i] });
      render(waypoint, this.mainContainer);
    }
  }
}
