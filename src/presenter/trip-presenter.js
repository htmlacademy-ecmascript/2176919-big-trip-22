import { render, RenderPosition } from '../framework/render.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import ButtonNewEvent from '../view/button-new-event.js';
import NoEvent from '../view/no-event.js';
import TripInfo from '../view/trip-info.js';
import { generateFilter } from '../utils/filter.js';
import WaypointPresenter from './waypoint-presenter.js';
import WaypointListView from '../view/waypoint-list-view.js';
import { updateItem, sortWaypointByDate, sortWaypointByPrice, sortWaypointByDuration } from '../utils/utilities.js';
import { SORT_TYPE } from '../utils/constants.js';
export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #waypointModel;
  #sorting;
  #buttonNewEvent = new ButtonNewEvent();
  #tripInfo = new TripInfo();
  #waypointListComponent;
  #waypoints = [];
  #waypointPresenters = new Map();
  #currentSortType = SORT_TYPE[0];

  constructor({ headerContainer, mainContainer, waypointModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#waypointModel = waypointModel;
    this.#waypointListComponent = new WaypointListView();
  }

  init() {
    this.#waypoints = [...this.#waypointModel.waypoints];
    this.#renderApp();
    render(this.#waypointListComponent, this.#mainContainer);
  }

  #renderWaypoint(point) {
    const waypointPresenter = new WaypointPresenter({
      waypointListComponent: this.#waypointListComponent,
      waypointModel: this.#waypointModel,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange,
    });
    waypointPresenter.init(point);
    this.#waypointPresenters.set(point.id, waypointPresenter);
  }

  #clearWaypointList() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypoints = updateItem(this.#waypoints, updatedWaypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #renderFilters() {
    const filters = generateFilter(this.#waypoints);
    render(new Filters({ filters }), this.#headerContainer);
  }

  #renderButtonNewEvent() {
    render(this.#buttonNewEvent, this.#headerContainer, RenderPosition.AFTEREND);
  }

  #renderTripInfo() {
    render(this.#tripInfo, this.#headerContainer, RenderPosition.BEFOREBEGIN);
  }

  #renderNoEvent() {
    render(new NoEvent(), this.#mainContainer);
  }

  #sortWaypoints(sortType) {
    switch (sortType) {
      case SORT_TYPE[0]:
        this.#waypoints.sort(sortWaypointByDate);
        break;
      case SORT_TYPE[1]:
        this.#waypoints.sort(sortWaypointByDuration);
        break;
      case SORT_TYPE[2]:
        this.#waypoints.sort(sortWaypointByPrice);
        break;
      default:
        this.#waypoints.sort(sortWaypointByDate);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortWaypoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
  };

  #renderSort() {
    this.#sorting = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sorting, this.#mainContainer);
  }

  #renderApp() {
    this.#renderFilters();
    this.#renderButtonNewEvent();
    this.#renderTripInfo();
    if (this.#waypoints.length === 0) {
      this.#renderNoEvent();
      return;
    }
    this.#renderSort();
    for (let i = 0; i < this.#waypoints.length; i++) {
      this.#renderWaypoint(this.#waypoints[i]);
    }
  }
}
