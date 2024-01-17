import { render, remove, RenderPosition } from '../framework/render.js';
import Filters from '../view/filters.js';
import Sorting from '../view/sorting.js';
import ButtonNewEvent from '../view/button-new-event.js';
import NoEvent from '../view/no-event.js';
import TripInfo from '../view/trip-info.js';
import { generateFilter } from '../utils/filter.js';
import { generateSorting } from '../utils/sort.js';
import WaypointPresenter from './waypoint-presenter.js';
import WaypointListView from '../view/waypoint-list-view.js';
import { sortWaypointByDate, sortWaypointByPrice, sortWaypointByDuration } from '../utils/utilities.js';
import { SortType, UpdateType, UserAction } from '../utils/constants.js';
export default class TripPresenter {
  #headerContainer;
  #mainContainer;
  #waypointModel;
  #offersModel;
  #destinationModel;
  #sorting;
  #buttonNewEvent = new ButtonNewEvent();
  #tripInfo = new TripInfo();
  #waypointListComponent;
  #waypointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sortingState = generateSorting(this.#currentSortType);

  constructor({ headerContainer, mainContainer, waypointModel, offersModel, destinationModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#waypointModel = waypointModel;
    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#waypointListComponent = new WaypointListView();
  }

  get waypoints() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#waypointModel.waypoints].sort(sortWaypointByDate);
      case SortType.TIME:
        return [...this.#waypointModel.waypoints].sort(sortWaypointByDuration);
      case SortType.PRICE:
        return [...this.#waypointModel.waypoints].sort(sortWaypointByPrice);
    }
    return [...this.#waypointModel.waypoints].sort(sortWaypointByDate);
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
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#waypointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearWaypointList();
        this.#renderWaypointList();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearWaypointList({ resetSortType: true });
        this.#renderWaypointList();
        break;
    }
  };

  #renderFilters() {
    const filters = generateFilter(this.waypoints);
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
