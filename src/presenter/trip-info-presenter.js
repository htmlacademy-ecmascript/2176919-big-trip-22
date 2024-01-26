import { replace, remove, render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  #tripInfoContainer;
  #waypointModel;
  #destinationModel;
  #tripInfoComponent = null;

  constructor({ tripInfoContainer, waypointModel, destinationModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#waypointModel = waypointModel;
    this.#destinationModel = destinationModel;

    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
  }

  get dateFrom() {
    const points = this.#waypointModel.waypoints;
    return points.at(0)?.dateFrom;
  }

  get dateTo() {
    const points = this.#waypointModel.waypoints;
    return points.at(-1)?.dateTo;
  }

  get destinationNames() {
    const points = this.#waypointModel.waypoints;
    const destinations = points.map((item) => this.#destinationModel.getDestinationsById(item.destination));
    const destinationNames = [];
    destinations.map((item) => {
      if (!destinationNames.includes(item.name)) {
        destinationNames.push(item.name);
      }
    });
    return destinationNames;
  }

  init() {
    const prevTripInfoComponents = this.#tripInfoComponent;
    const dateFrom = this.dateFrom;
    const dateTo = this.dateTo;
    const destinationNames = this.destinationNames;
    this.#tripInfoComponent = new TripInfo({ dateFrom, dateTo, destinationNames });

    if (prevTripInfoComponents === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponents);
    remove(prevTripInfoComponents);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
