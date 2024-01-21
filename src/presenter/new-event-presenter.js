import { v4 as uuidv4 } from 'uuid';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, DEFAULT_TYPE } from '../utils/constants.js';
import FormEdit from '../view/form-edit.js';

export default class NewEventPresenter {

  #pointListContainer;
  #handleDataChange;
  #handleDestroy;

  #point;
  #destinationModel;
  #offersModel;

  #FormComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy, point, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#point = point;
    this.#destinationModel = destinations;
    this.#offersModel = offers;
  }

  init() {
    if (this.#FormComponent !== null) {
      return;
    }

    this.#FormComponent = new FormEdit({
      waypoint: { type: DEFAULT_TYPE, basePrice: 0 },
      offers: [],
      destination: { name: '', photos: [], description: '' },
      offersType: this.#offersModel.getOffersByType(DEFAULT_TYPE),
      destinationAll: this.#destinationModel.destinations,
      offersAll: [...this.#offersModel.offers],
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditMode: true,
    });

    render(this.#FormComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#FormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#FormComponent);
    this.#FormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      { ...point, id: uuidv4() },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
