import {render} from '../render.js';
import FormEdit from '../view/form-edit.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import FormCreation from '../view/form-creation.js';
import Waypoint from '../view/waypoint.js';

const WAYPOINTS_COUNT = 3;
export default class TripPresenter {
  constructor(hederConteiner, mainConteiner) {
    this.hederConteiner = hederConteiner;
    this.mainConteiner = mainConteiner;
  }

  init() {
    const formEdit = new FormEdit();
    render(formEdit, this.mainConteiner);

    const filters = new Filters();
    render(filters, this.hederConteiner);

    const sorting = new Sorting();
    render(sorting, this.mainConteiner);

    const formCreation = new FormCreation();
    render(formCreation, this.mainConteiner);

    for (let i = 0; i < WAYPOINTS_COUNT; i++) {
      const waypoint = new Waypoint();
      render(waypoint, this.mainConteiner);
    }
  }
}
