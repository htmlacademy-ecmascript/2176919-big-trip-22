import { render, replace } from '../framework/render.js';
import Waypoint from '../view/waypoint.js';
import FormEdit from '../view/form-edit.js';

export default class WaypointPresenter {
  #mainContainer;
  #waypointModel;
  #waypointComponent;
  #waypointEditComponent;

  constructor({ mainContainer, waypointModel }) {
    this.#mainContainer = mainContainer;
    this.#waypointModel = waypointModel;
  }

  init(point) {
    this.#waypointComponent = new Waypoint({
      waypoint: point,
      offers: [...this.#waypointModel.getOffersById(point.type, point.offersId)],
      destination: this.#waypointModel.getDestinationsById(point.destination),
      onEditClick: this.#handleEditClick,
    });

    this.#waypointEditComponent = new FormEdit({
      waypoint: point,
      offersType: this.#waypointModel.getOffersByType(point.type),
      offers: [...this.#waypointModel.getOffersById(point.type, point.offersId)],
      destination: this.#waypointModel.getDestinationsById(point.destination),
      destinationAll: this.#waypointModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
    });
    render(this.#waypointComponent, this.#mainContainer);
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

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
