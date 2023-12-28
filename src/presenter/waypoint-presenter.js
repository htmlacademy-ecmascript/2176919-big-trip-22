import { render, replace, remove } from '../framework/render.js';
import Waypoint from '../view/waypoint.js';
import FormEdit from '../view/form-edit.js';

export default class WaypointPresenter {
  #waypointListComponent = null;
  #waypointModel = null;
  #waypointComponent = null;
  #waypointEditComponent = null;
  #waypoint = null;
  #handleDataChange = null;

  constructor({ waypointListComponent, waypointModel, onDataChange }) {
    this.#waypointListComponent = waypointListComponent;
    this.#waypointModel = waypointModel;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#waypoint = point;

    const prevWaypointComponent = this.#waypointComponent;
    const prevWaypointEditComponent = this.#waypointEditComponent;

    this.#waypointComponent = new Waypoint({
      waypoint: this.#waypoint,
      offers: [...this.#waypointModel.getOffersById(point.type, point.offersId)],
      destination: this.#waypointModel.getDestinationsById(point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#waypointEditComponent = new FormEdit({
      waypoint: this.#waypoint,
      offersType: this.#waypointModel.getOffersByType(point.type),
      offers: [...this.#waypointModel.getOffersById(point.type, point.offersId)],
      destination: this.#waypointModel.getDestinationsById(point.destination),
      destinationAll: this.#waypointModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevWaypointComponent === null || prevWaypointEditComponent === null) {
      render(this.#waypointComponent, this.#waypointListComponent.element);
      return;
    }
    if (this.#waypointListComponent.element.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }
    if (this.#waypointListComponent.element.contains(prevWaypointEditComponent.element)) {
      replace(this.#waypointEditComponent, prevWaypointEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointEditComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#waypointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#waypointEditComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#waypointComponent, this.#waypointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#waypoint, isFavorite: !this.#waypoint.isFavorite });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };
}
