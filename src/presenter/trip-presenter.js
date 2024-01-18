import { render, remove, RenderPosition } from '../framework/render.js';
import Sorting from '../view/sorting.js';
import ButtonNewEvent from '../view/button-new-event.js';
import NoEvent from '../view/no-event.js';
import TripInfo from '../view/trip-info.js';
import { generateSorting } from '../utils/sort.js';
import WaypointPresenter from './waypoint-presenter.js';
import WaypointListView from '../view/waypoint-list-view.js';
import { sortWaypointByDate, sortWaypointByPrice, sortWaypointByDuration, filter } from '../utils/utilities.js';
import { SortType, UpdateType, UserAction } from '../utils/constants.js';
import FilterPresenter from './filter-presenter.js';
export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #waypointModel;
  #offersModel;
  #destinationModel;
  #filterModel;
  #sorting;
  #buttonNewEvent = new ButtonNewEvent();
  #tripInfo = new TripInfo();
  #waypointListComponent;
  #waypointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  constructor({ headerContainer, mainContainer, waypointModel, offersModel, destinationModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#waypointModel = waypointModel;
    this.#filterModel = filterModel;
    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#waypointListComponent = new WaypointListView();
  }

  get waypoints() {
    const filterType = this.#filterModel.filter;
    const waypoints = this.#waypointModel.waypoints;
    const filteredWaypoints = filter[filterType](waypoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredWaypoints.sort(sortWaypointByDate);
      case SortType.TIME:
        return filteredWaypoints.sort(sortWaypointByDuration);
      case SortType.PRICE:
        return filteredWaypoints.sort(sortWaypointByPrice);
    }
    return filteredWaypoints.sort(sortWaypointByDate);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationModel.destinations;
  }

  init() {
    this.#renderApp();
    render(this.#waypointListComponent, this.#mainContainer);
  }

  #renderWaypoint(point) {
    const waypointPresenter = new WaypointPresenter({
      waypointListComponent: this.#waypointListComponent,
      waypointModel: this.#waypointModel,
      offersModel: this.#offersModel,
      destinationModel: this.#destinationModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    waypointPresenter.init(point);
    this.#waypointPresenters.set(point.id, waypointPresenter);
  }

  #clearWaypointList(resetSortType = false) {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
    remove(this.#sorting);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderWaypointList() {
    const waypointCount = this.waypoints.length;
    const waypoints = this.waypoints.slice(0, waypointCount);
    if (waypointCount === 0) {
      this.#renderNoEvent();
      return;
    }
    this.#renderSort();
    for (let i = 0; i < waypointCount; i++) {
      this.#renderWaypoint(waypoints[i]);
    }
  }

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#waypointModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#waypointModel.deleteWaypoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearWaypointList();
        this.#renderWaypointList();
        break;
      case UpdateType.MAJOR:
        this.#clearWaypointList({ resetSortType: true });
        this.#renderWaypointList();
        break;
    }
  };

  #renderFilters() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#headerContainer,
      filterModel: this.#filterModel,
      waypointModel: this.#waypointModel,
    });
    filterPresenter.init();
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearWaypointList();
    this.#renderWaypointList();
  };

  #renderSort() {
    this.#sortingState = generateSorting(this.#currentSortType);
    this.#sorting = new Sorting({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
      sorting: this.#sortingState,
    });

    render(this.#sorting, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderApp() {
    this.#renderFilters();
    this.#renderButtonNewEvent();
    this.#renderTripInfo();
    if (this.waypoints.length === 0) {
      this.#renderNoEvent();
      return;
    }
    this.#renderWaypointList();
  }
}
